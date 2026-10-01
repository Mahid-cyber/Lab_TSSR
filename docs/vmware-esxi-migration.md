# Projet — Virtualisation VMware ESXi et migration Windows Server

## Contexte

Projet réalisé pendant le stage de formation TSSR au sein de la Direction Régionale du Service Médical à Marseille.

La mission s'inscrivait dans une démarche de modernisation de l'infrastructure et de migration progressive de services **Windows Server 2012 vers Windows Server 2016**.

## Architecture de travail

```
Serveur physique Dell
        │
        ▼
     VMware ESXi
        │
   ┌────┼────┐
   ▼    ▼    ▼
   VM   VM   VM
   │    │    │
Services Windows Server
        │
        ▼
Migration progressive
2012  ───────────►  2016
```

## Travaux réalisés

### 1. Installation de l'hyperviseur

Installation de **VMware ESXi** sur un serveur physique Dell.

### 2. Configuration initiale

Mise en place des paramètres nécessaires au fonctionnement de l'environnement :

- réseau ;
- stockage ;
- accès à l'hyperviseur.

### 3. Création des machines virtuelles

Création et paramétrage des machines virtuelles destinées à héberger les services de l'entreprise.

### 4. Migration

Participation à la migration progressive des services de **Windows Server 2012 vers Windows Server 2016**.

### 5. Validation

Vérification de la compatibilité des services et de la continuité de fonctionnement après migration.

## Compétences démontrées

- VMware ESXi ;
- virtualisation de serveurs ;
- création et configuration de machines virtuelles ;
- configuration réseau et stockage ;
- accompagnement d'une migration Windows Server ;
- validation post-migration ;
- démarche de modernisation d'infrastructure.

## Documentation

Ce projet est présenté à partir de l'expérience professionnelle décrite dans le CV. Les informations techniques internes de l'entreprise ne sont pas publiées.

---

**Référence : expérience professionnelle / stage TSSR.**
