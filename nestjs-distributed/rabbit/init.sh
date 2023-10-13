#!/bin/sh

(
  rabbitmqctl wait --timeout 60 --pid 1; \
  rabbitmqctl set_policy F "^eventbus.internal$" '{"federation-upstream-set":"all"}' --apply-to all; \
  rabbitmqadmin declare exchange --vhost=/ name=eventbus.internal type=direct; \
  rabbitmqadmin declare exchange --vhost=/ name=eventbus.external type=fanout; \
  rabbitmqadmin declare exchange --vhost=/ name=eventbus.global type=fanout; \
  rabbitmqadmin --vhost=/ declare binding source=eventbus.global destination_type=exchange destination=eventbus.internal; \
  rabbitmqadmin --vhost=/ declare binding source=eventbus.global destination_type=exchange destination=eventbus.external; \
  rabbitmqctl set_parameter federation-upstream $UPSTREAM_NAME $UPSTREAM_CONFIG
) &

rabbitmq-server $@
