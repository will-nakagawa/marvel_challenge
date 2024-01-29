CREATE TABLE public."characters" (
	id int4 NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(1000) NULL,
	picture varchar(1000) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT characters_name_unique UNIQUE (name),
	CONSTRAINT characters_pkey PRIMARY KEY (id)
);