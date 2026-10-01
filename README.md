# Lab_TSSR — Portfolio technique

Portfolio technique de **Mahid Aggoune**, construit autour de projets de laboratoire en administration systèmes, réseaux, déploiement et virtualisation.

> Objectif : montrer des réalisations concrètes, documentées et reproductibles — pas seulement une liste de technologies.

## 🎯 Projet principal

### Déploiement automatisé de Windows 11 26H2 avec MDT / WDS / PXE

Environnement validé sur **Hyper-V** puis sur **serveur physique**.

**Chaîne de déploiement :**

```
Windows Server 2022
├── Active Directory
├── DNS
├── DHCP
├── WDS
└── MDT
        │
        ▼
     PXE / UEFI
        │
        ▼
      WinPE
        │
        ▼
 Windows 11 26H2
        │
        ▼
 Partition GPT / EFI
        │
        ▼
     BCDBoot
```

### Incident rencontré et résolution

Le déploiement rencontrait l'erreur :

```
FAILURE (5616): 15299: Verify BCDBootEx
LiteTouch deployment failed
0x80004005
```

Les tests ont permis de vérifier successivement :

- le démarrage PXE en UEFI ;
- la détection et l'intégration des pilotes réseau dans WinPE ;
- la création correcte des partitions GPT/EFI ;
- l'exécution manuelle de `bcdboot` ;
- la configuration WDS et la sélection de l'image x64 UEFI.

Le correctif Microsoft appliqué à **Microsoft.BDD.Utility.dll** a permis de faire passer le fichier de la version **6.3.8456.1000** à **6.3.8456.1001**. Après régénération complète de l'image de démarrage MDT, le déploiement a été validé avec **0 erreur et 0 avertissement**, d'abord sur Hyper-V puis sur le serveur physique.

## 🧰 Technologies pratiquées

| Domaine | Technologies / pratiques |
|---|---|
| Windows Server | AD DS, DNS, DHCP, WDS |
| Déploiement | MDT, WinPE, PXE, UEFI, GPT |
| Virtualisation | Hyper-V, VMware, ESXi, Proxmox |
| Linux | Ubuntu, administration système |
| Conteneurs | Docker / Docker Compose |
| ITSM | GLPI |
| Scripting | PowerShell, Bash |
| Réseaux | DHCP, DNS, NAT, PXE, segmentation de lab |

## 📁 Organisation du dépôt

```
Lab_TSSR/
├── README.md
├── index.html
├── style.css
├── script.js
└── docs/
    └── screenshots/      # captures des projets à ajouter
```

## 👤 Parcours professionnel

Le portfolio complète un parcours de **Technicien Système et Réseaux** avec des expériences en Active Directory, déploiement de postes Windows, gestion de parc et virtualisation.

Le parcours comprend notamment une expérience de **Gestionnaire Infrastructures Matériel Logiciel** (2024–2025), une expérience d'**Analyste IT** (2023–2024), un stage consacré à la **virtualisation VMware ESXi et à une migration Windows Server 2012 → 2016** (2022), ainsi qu'une mission de **déploiement Windows 10** (2020). Voir [le profil détaillé](docs/profile.md).

## 🧪 Autres labs

Le portfolio pourra intégrer progressivement les autres environnements réellement travaillés :

- Active Directory / DNS / DHCP ;
- Hyper-V, VMware/ESXi et Proxmox ;
- Linux / Docker ;
- GLPI / ITSM ;
- Nagios / Zabbix ;
- PowerShell / Bash.

Ces labs seront ajoutés avec la même méthode que le projet MDT : contexte, architecture, configuration, difficultés, diagnostic et résultat.

## 🖥️ Homelab

Le laboratoire sert à reproduire des scénarios proches de ceux rencontrés en entreprise :

- services Windows Server ;
- domaine Active Directory ;
- services DNS/DHCP ;
- déploiement de postes par PXE ;
- virtualisation ;
- environnements Linux ;
- services conteneurisés ;
- tests de diagnostic et de dépannage.

## 📸 Captures

Les captures du laboratoire seront ajoutées progressivement dans `docs/screenshots/` et intégrées aux fiches projets du portfolio.

## 🌐 Portfolio

La page `index.html` constitue la vitrine web du dépôt et peut être publiée avec **GitHub Pages**.

Dépôt : https://github.com/Mahid-cyber/Lab_TSSR

## ⚠️ Sécurité

Aucune adresse IP publique, mot de passe, secret, clé ou information sensible de l'infrastructure personnelle ne doit être publiée dans ce dépôt.

---

**Mahid Aggoune — Technicien Systèmes & Réseaux**  
*Orientation administration systèmes & infrastructures*
