import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_subscribers_source" AS ENUM('lead-magnet', 'newsletter', 'blog-inline', 'footer-block');
  CREATE TYPE "public"."enum_subscribers_status" AS ENUM('pending', 'confirmed', 'unsubscribed', 'bounced');
  CREATE TYPE "public"."enum_subscribers_flodesk_sync_status" AS ENUM('not-synced', 'synced', 'failed', 'skipped');
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"source" "enum_subscribers_source" DEFAULT 'lead-magnet' NOT NULL,
  	"lead_magnet_slug" varchar,
  	"tag" varchar,
  	"status" "enum_subscribers_status" DEFAULT 'pending',
  	"page_submitted_from" varchar,
  	"user_agent" varchar,
  	"confirmed_at" timestamp(3) with time zone,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"last_delivery_at" timestamp(3) with time zone,
  	"delivery_count" numeric DEFAULT 0,
  	"flodesk_sync_status" "enum_subscribers_flodesk_sync_status" DEFAULT 'not-synced',
  	"flodesk_external_id" varchar,
  	"gdpr_anonymized_at" timestamp(3) with time zone,
  	"gdpr_anonymized_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "subscribers_id" integer;
  ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_gdpr_anonymized_by_id_users_id_fk" FOREIGN KEY ("gdpr_anonymized_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_gdpr_anonymized_by_idx" ON "subscribers" USING btree ("gdpr_anonymized_by_id");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "subscribers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "subscribers" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_subscribers_fk";
  
  DROP INDEX "payload_locked_documents_rels_subscribers_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "subscribers_id";
  DROP TYPE "public"."enum_subscribers_source";
  DROP TYPE "public"."enum_subscribers_status";
  DROP TYPE "public"."enum_subscribers_flodesk_sync_status";`)
}
