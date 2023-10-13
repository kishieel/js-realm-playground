### Get Started

```
./scripts/start.sh
./scripts/migrate.sh
```

### Architecture Preview

![preview](./docs/architecture.svg)

### Exchange Bindings

![preview](./docs/exchanges.svg)

The white arrows represent standard bindings. The red arrows represent federated exchange-to-exchange bindings.

### Endpoints

| Cluster | Service | Address                           |
|---------|---------|-----------------------------------|
| 1       | Gateway | http://cluster-1.localhost:80/api |
| 2       | Gateway | http://cluster-2.localhost:80/api |
| 1       | Rabbit  | http://localhost:15672            |
| 2       | Rabbit  | http://localhost:15673            |
| 1       | Mysql   | mysql://localhost:3306            |
| 2       | Mysql   | mysql://localhost:3307            |
