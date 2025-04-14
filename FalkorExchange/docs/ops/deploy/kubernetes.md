# Deploying Falkor Exchange on [Kubernetes](https://kubernetes.io/)

## Overview

1. [Dependencies](#dependencies)
2. [Configuration](#configuration)
3. [Installing the chart](#installing-the-chart)
3. [Getting help](#getting-help)

## Dependencies

Falkor Exchange has 3 main dependencies:

- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/)

If you don't have them installed yet, you can check our [helm charts repo](https://charts.falkor.tech/).

## Configuration

All the configuration goes in `config/charts/falkor/values.yaml`. It has many helpful comments, but in this section we have more details about each config option.

| Name                      | Default Value                  | Description                   |
| ------------------------- | ------------------------------ | ----------------------------- |
| `replicaCount`            | `1`                            | Number of pod's replicas      |
| `image.repository`        | `"rubykube/falkor"`            | Image repo                    |
| `image.tag`               | `"0.2.2"`                      | Image version                 |
| `image.pullPolicy`        | `"IfNotPresent"`               | Image pull polucy             |
| `service.name`            | `"falkor"`                     | Service name                  |
| `service.type`            | `"ClusterIP"`                  | Service type                  |
| `service.externalPort`    | `8080`                         | Service external port         |
| `service.internalPort`    | `8080`                         | Service internal port         |
| `ingress.enabled`         | `false`                        | Enable or disable the ingress |
| `ingress.hosts`           | `["falkor.local"]`             | The virtual hosts names       |
| `ingress.annotations`     | see `values.yaml`              | Ingress annotations           |
| `ingress.tls.secretName`  | `"falkor-tls"`                 | TLS secret name               |
| `ingress.tls.hosts`       | `["falkor.local"]`             | TLS virtual hosts names       |
| `resources.limits.cpu`    | `"100m"`                       | CPU resource requests         |
| `resources.limits.memory` | `"128Mi"`                      | Memory resource limits        |
| `resources.limits.cpu`    | `"100m"`                       | CPU resource requests         |
| `resources.limits.memory` | `"128Mi"`                      | Memory resource requests      |
| `falkor.env`              | see `application.yml`          | Falkor Exchange environment config     |
| `db.host`                 | `"%current-release%-db"`       | Your MySQL host               |
| `db.user`                 | `"root"`                       | MySQL user                    |
| `db.password`             | `nil`                          | MySQL password                |
| `redis.host`              | `"%current-release%-redis"`    | Your Redis host               |
| `redis.password`          | `nil`                          | Redis password                |
| `rabbitmq.host`           | `"%current-release%-rabbitmq"` | Your RabbitMQ host            |
| `rabbitmq.port`           | `5672`                         | RabbitMQ port                 |
| `rabbitmq.username`       | `nil`                          | RabbitMQ username             |
| `rabbitmq.password`       | `nil`                          | RabbitMQ password             |

## Installing the chart

This one is simple:

```shell
helm install config/falkor/charts
```

If you want use `helm package` and external values file, try this:

```shell
$ helm package
Successfully packaged chart and saved it to: falkor-0.1.0.tgz
$ helm install falkor-0.1.0.tgz -f path/to/your/values.yaml
NAME: random-name
...
```

That's all you need to deploy falkor on kubernetes.

## Getting help

If you got any trouble with this deployment, please [open an issue](https://github.com/rubykube/falkor/issues/new). If you want external devops support with falkor, contact hello@falkor.tech.