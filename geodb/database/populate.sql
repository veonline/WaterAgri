insert into meta.site(name, schema, geom) VALUES ('Italy - Bologna', 'it',st_setsrid(st_makepoint(11.7845981,44.4303223),4326));
insert into meta.site(name, schema, geom) VALUES ('Sweden - LUND', 'sw1', st_setsrid(st_makepoint(13.2030675,55.7119069),4326));
insert into meta.site(name, schema, geom) VALUES ('POland - Lubnov', 'pl', st_setsrid(st_makepoint(16.89711895,51.24908923),4326));




insert into meta.topic(id_topic, area, topic, topic_name, format) VALUES (1, 'farm','farm_field','Farm fields', 'MULTIPOLYGON');
insert into meta.topic(id_topic, area, topic, topic_name, format) VALUES (2, 'hydro','hydro_network','Hydrological network', 'MULTILINESTRING');

insert into meta.field(id_topic, name, description, field_type) VALUES (1, 'field_name','Field name','varchar(255)');
insert into meta.field(id_topic, name, description, field_type) VALUES (1, 'crop_code','Crop','varchar(255)');

insert into meta.field(id_topic, name, description, field_type) VALUES (2, 'name','name','varchar(255)');
insert into meta.field(id_topic, name, description, field_type) VALUES (2, 'min_width','Min Width','float');
insert into meta.field(id_topic, name, description, field_type) VALUES (2, 'max_width','Max Width','float');
