--CREATE EXTENSION IF NOT EXISTS POSTGIS;

--store user data
CREATE SCHEMA IF NOT EXISTS keycloak;

CREATE SCHEMA IF NOT EXISTS meta;

CREATE TABLE meta.site
(
  id_site serial,
  name character varying,
  description text default '',
  geom geometry(POINT,4326),
  schema character varying,
  user_id character varying,
  CONSTRAINT site_pkey PRIMARY KEY (id_site)
);
COMMENT ON TABLE meta.site IS 'List of the Wateragri site (case study).';


CREATE TABLE meta.site_user
(
  id_site character varying,
  user_id  character varying,
  authorisation character varying,
  CONSTRAINT site_user_pkey PRIMARY KEY (id_site, user_id)
);
COMMENT ON TABLE meta.site_user IS 'list of user associated to that specific sites; in this way each sites can define who can access each site data.';

CREATE TABLE meta.solution
(
  id_solution serial,
  name   character varying,
  description text,
  user_id character varying,
  CONSTRAINT solution_pkey PRIMARY KEY (id_solution)
);
COMMENT ON TABLE meta.solution IS 'The table store the list of wateragri solutions.';


CREATE TABLE meta.topic
(
  id_topic serial,
  category character varying,
  topic character varying,
  name character varying,
  description text default '',
  format character varying,
  json_data json,
  CONSTRAINT topic_pkey PRIMARY KEY (id_topic)
);
COMMENT ON TABLE meta.topic IS 'Type of generic spatial data managed in the geodb. All the actual data should belong to 1 topic; topic are classified in group';


CREATE TABLE meta.field
(
  id_field serial,
  id_topic integer,
  name character varying,
  description text,
  field_type character varying,
  CONSTRAINT field_pkey PRIMARY KEY (id_field)
);
COMMENT ON TABLE meta.field IS 'Each topic has a set of pre-codified field;';


CREATE TABLE meta.layer
(
  id_layer serial,
  id_topic integer,
  id_site integer,
  layer_name character varying,
  description text,
  CONSTRAINT layer_pkey PRIMARY KEY (id_layer)
);
COMMENT ON TABLE meta.layer IS 'A layer is an actual spatial data reated to a topic and for a specific site;';
