# Vault configuration

## Introduction

This document describe how to create vault tokens in order to configure **falkor-rails** to be able **to encrypt** secrets, **to renew** token and **to manage** totp, to configure **falkor-crypto-daemons** to be able **to encrypt** secrets, **to decrypt** secrets, **to renew** token, to configure **falkor-upstream-proxy** to be able **to decrypt** secrets, **to renew** token. 

## Connect to vault

You can validate it works running the following command:
```bash
$ vault status

Type: shamir
Sealed: false
Key Shares: 1
Key Threshold: 1
Unseal Progress: 0
Unseal Nonce: 
Version: 1.3.4
Cluster Name: vault-cluster-650930cf
Cluster ID: 9f40327d-ec71-9655-b728-7588ce47d0b4

High-Availability Enabled: false
```

## Create ACL groups

### Create the following policy files

**falkor-rails.hcl**

```bash
# Manage the transit secrets engine
path "transit/keys/*" {
  capabilities = [ "create", "read", "list" ]
}

# Encrypt engines secrets
path "transit/encrypt/opendax_engines_*" {
  capabilities = [ "create", "read", "update" ]
}

# Encrypt wallets secrets
path "transit/encrypt/opendax_wallets_*" {
  capabilities = [ "create", "read", "update" ]
}

# Encrypt beneficiaries data
path "transit/encrypt/opendax_beneficiaries_*" {
  capabilities = [ "create", "read", "update" ]
}

# Decrypt beneficiaries data
path "transit/decrypt/opendax_beneficiaries_*" {
  capabilities = [ "create", "read", "update" ]
}

# Renew tokens
path "auth/token/renew" {
  capabilities = [ "update" ]
}

# Lookup tokens
path "auth/token/lookup" {
  capabilities = [ "update" ]
}

# Verify an otp code
path "totp/code/opendax_*" {
  capabilities = ["update"]
}
```

**falkor-crypto-daemons.hcl**

```bash
# Manage the transit secrets engine
path "transit/keys/*" {
  capabilities = [ "create", "read", "list" ]
}

# Encrypt Payment Addresses secrets
path "transit/encrypt/opendax_payment_addresses_*" {
  capabilities = [ "create", "read", "update" ]
}

# Decrypt Payment Addresses secrets
path "transit/decrypt/opendax_payment_addresses_*" {
  capabilities = [ "create", "read", "update" ]
}

# Decrypt wallets secrets
path "transit/decrypt/opendax_wallets_*" {
  capabilities = [ "create", "read", "update" ]
}

# Renew tokens
path "auth/token/renew" {
  capabilities = [ "update" ]
}

# Lookup tokens
path "auth/token/lookup" {
  capabilities = [ "update" ]
}
```

**falkor-upstream-proxy.hcl**

```bash
# Manage the transit secrets engine
path "transit/keys/*" {
  capabilities = [ "create", "read", "list" ]
}

# Decrypt Engines secrets
path "transit/decrypt/opendax_engines_*" {
  capabilities = [ "create", "read", "update" ]
}

# Renew tokens
path "auth/token/renew" {
  capabilities = [ "update" ]
}

# Lookup tokens
path "auth/token/lookup" {
  capabilities = [ "update" ]
}
```

### Create the ACL groups in vault

```bash
vault policy write falkor-rails falkor-rails.hcl
vault policy write falkor-crypto-daemons falkor-crypto-daemons.hcl
vault policy write falkor-upstream-proxy falkor-upstream-proxy.hcl
```

### Create applications tokens

```bash
vault token create -policy=falkor-rails -period=240h
vault token create -policy=falkor-crypto-daemons -period=240h
vault token create -policy=falkor-upstream-proxy -period=240h
```

## Configure Falkor Exchange

Set those variables according to your deployment:
```bash
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=s.jyH1vmrOmkZ0FZZ0NZtgRenS
export VAULT_APP_NAME=opendax
```
