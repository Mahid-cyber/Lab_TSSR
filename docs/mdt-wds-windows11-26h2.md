# Projet — Déploiement automatisé de Windows 11 26H2 avec MDT / WDS / PXE

## Présentation

Ce projet documente la mise en place d'une chaîne de déploiement automatisé de **Windows 11 26H2** dans un laboratoire Windows Server.

L'objectif était de permettre à un poste physique ou à une machine virtuelle de démarrer par **PXE en UEFI**, de charger l'environnement **MDT LiteTouch/WinPE**, puis d'installer automatiquement Windows 11 sur un disque préparé en **GPT/UEFI**.

Le scénario a été validé dans deux environnements :

- **Hyper-V**
- **Serveur physique**

## Architecture

```
                         ┌──────────────────────────┐
                         │   Windows Server 2022    │
                         │                          │
                         │  Active Directory        │
                         │  DNS                     │
                         │  DHCP                    │
                         │  WDS                     │
                         │  MDT                     │
                         └────────────┬─────────────┘
                                      │
                                  PXE / UEFI
                                      │
                         ┌────────────▼─────────────┐
                         │        WinPE / MDT       │
                         │      LiteTouch x64       │
                         └────────────┬─────────────┘
                                      │
                               Task Sequence
                                      │
                         ┌────────────▼─────────────┐
                         │      Disque client       │
                         │                          │
                         │  EFI   │ MSR │ Windows   │
                         │  GPT / UEFI                         │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                              Windows 11 26H2
```

## Composants

| Composant | Rôle |
|---|---|
| Windows Server 2022 | Serveur d'infrastructure |
| Active Directory | Domaine et administration centralisée |
| DNS | Résolution de noms |
| DHCP | Attribution réseau et prise en charge PXE |
| WDS | Service de démarrage PXE |
| MDT 8456 | Automatisation du déploiement |
| WinPE / LiteTouch | Environnement de préinstallation |
| Windows 11 26H2 | Système déployé |
| Hyper-V | Premier environnement de validation |
| Serveur physique | Deuxième environnement de validation |

## Configuration WDS / DHCP

Dans ce laboratoire, **DHCP et WDS fonctionnent sur le même serveur**.

La configuration validée utilise :

- DHCP option 60 : activée ;
- ports DHCP utilisés par WDS : désactivés ;
- programme UEFI x64 : `Boot\\x64\\bootmgfw.efi` ;
- image de démarrage LiteTouch x64 ;
- image LiteTouch configurée comme image de démarrage par défaut pour x64 UEFI.

Cette configuration a été vérifiée avec `wdsutil /Get-Server /Show:Config`.

## Déroulement du déploiement

### 1. Démarrage PXE

Le poste client démarre en **UEFI IPv4** et obtient une adresse via DHCP.

WDS fournit le programme de démarrage puis l'image :

```
PXE
 ↓
bootmgfw.efi
 ↓
LiteTouchPE_x64.wim
 ↓
MDT / WinPE
```

### 2. Préparation du disque

La séquence MDT prépare le disque pour un démarrage UEFI :

```
GPT
├── EFI System Partition
├── MSR
├── Windows NTFS
└── Recovery
```

Lors du diagnostic, le volume Windows était présenté en `D:` et la partition EFI en `W:` dans WinPE.

### 3. Installation du système

La Task Sequence installe Windows 11 puis prépare les fichiers de démarrage.

Un test manuel a permis de vérifier que la commande :

```cmd
bcdboot D:\Windows /s W: /f UEFI
```

retourne :

```
Boot files successfully created.
```

Ce test a permis d'isoler le problème du moteur MDT plutôt que d'un défaut fondamental du disque, de GPT ou de BCDBoot sur le client.

## Incident rencontré

Le déploiement échouait après l'installation de Windows avec :

```
FAILURE (5616): 15299: Verify BCDBootEx
LiteTouch deployment failed
Return Code = -2147467259
0x80004005
```

Plusieurs pistes ont été vérifiées pendant le dépannage :

- démarrage BIOS contre UEFI ;
- architecture x64 / x64 UEFI ;
- configuration WDS ;
- image LiteTouch ;
- présence du pilote réseau dans WinPE ;
- correspondance des lettres de volumes ;
- structure GPT ;
- fonctionnement manuel de BCDBoot.

## Pilote réseau WinPE

Sur une machine physique, WinPE ne possédait initialement pas le pilote de la carte réseau Intel identifiée par :

```
PCI\VEN_8086&DEV_0D4D
```

Le pilote Intel correspondant a été intégré dans les **Out-of-Box Drivers** MDT puis l'image de démarrage a été régénérée.

Cette étape a permis de rétablir l'accès au partage de déploiement :

```
\\MDT01\\DeploymentShare$
```

## Correction du problème 5616 / 15299

L'analyse a mis en évidence une version ancienne de :

```
Microsoft.BDD.Utility.dll
```

Version initiale :

```
6.3.8456.1000
```

Après application du correctif Microsoft :

```
6.3.8456.1001
```

Le fichier a été mis à jour dans les outils MDT concernés, puis le **Deployment Share a été complètement régénéré** afin d'intégrer la nouvelle version dans WinPE.

## 📸 Galerie des preuves

La galerie du portfolio utilise quatre captures du laboratoire : erreur 5616/15299, diagnostic GPT/EFI, version initiale de `Microsoft.BDD.Utility.dll`, puis validation finale.

Fichiers : `docs/screenshots/01-erreur-5616.webp`, `docs/screenshots/02-partitions-gpt.webp`, `docs/screenshots/03-dll-avant-correctif.webp`, `docs/screenshots/04-deploiement-success.webp`.

## Validation

La solution a été reproduite avec succès dans deux environnements :

### Hyper-V

```
PXE UEFI
   ↓
MDT
   ↓
Windows 11 26H2
   ↓
Déploiement réussi
```

### Serveur physique

```
PXE UEFI
   ↓
MDT
   ↓
SSD cible
   ↓
Windows 11 26H2
   ↓
Déploiement réussi
```

Le déploiement final a été validé avec :

```
Deployment Summary
Success

0 erreur
0 avertissement
```

## Compétences démontrées

Ce projet met notamment en évidence :

- administration Windows Server ;
- Active Directory ;
- DNS et DHCP ;
- WDS ;
- MDT ;
- PXE ;
- UEFI / GPT ;
- WinPE ;
- intégration de pilotes ;
- dépannage de séquences de déploiement ;
- analyse des journaux et codes d'erreur ;
- utilisation de `wdsutil`, `diskpart` et `bcdboot` ;
- validation sur environnement virtuel et matériel physique.

## Preuves visuelles

Les quatre captures actuellement publiées sont disponibles dans `docs/screenshots/` et sont intégrées à la galerie du portfolio.

D'autres preuves pourront être ajoutées lors de la documentation des étapes complémentaires du projet.

## Sécurité et publication

Avant toute publication sur GitHub :

- anonymiser les informations sensibles ;
- ne jamais publier de mots de passe ou secrets ;
- ne pas publier de clés d'accès ;
- éviter les adresses IP publiques ;
- masquer les informations personnelles inutiles ;
- conserver des schémas réseau génériques.

---

## Résultat

**Chaîne de déploiement MDT/WDS/PXE UEFI Windows 11 26H2 validée sur Hyper-V et serveur physique.**

Le projet constitue une démonstration complète d'une démarche **installation → diagnostic → correction → validation**.
