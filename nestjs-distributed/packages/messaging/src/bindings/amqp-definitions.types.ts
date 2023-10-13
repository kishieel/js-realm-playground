export type ArgumentsDefinition = {
    [key: string]: string | number | boolean | ArgumentsDefinition;
};

export type BindingDefinition = {
    source: string;
    vhost: string;
    destination: string;
    destination_type: string;
    routing_key: string;
    properties_key: string;
    arguments: ArgumentsDefinition;
};
