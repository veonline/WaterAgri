docker exec -e PGPASSWORD=changeit -i db pg_dump -U postgres -h 127.0.0.1 --inserts -n meta  wateragri > dump/meta.sql
docker exec -e PGPASSWORD=changeit -i db pg_dump -U postgres -h 127.0.0.1 --inserts   wateragri > dump/all.sql
