import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "portfolio_series_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "_portfolio_series_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "portfolio_series_features" ADD CONSTRAINT "portfolio_series_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_version_features" ADD CONSTRAINT "_portfolio_series_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_series_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_series_features_order_idx" ON "portfolio_series_features" USING btree ("_order");
  CREATE INDEX "portfolio_series_features_parent_id_idx" ON "portfolio_series_features" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_series_v_version_features_order_idx" ON "_portfolio_series_v_version_features" USING btree ("_order");
  CREATE INDEX "_portfolio_series_v_version_features_parent_id_idx" ON "_portfolio_series_v_version_features" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "portfolio_series_features" CASCADE;
  DROP TABLE "_portfolio_series_v_version_features" CASCADE;`)
}
