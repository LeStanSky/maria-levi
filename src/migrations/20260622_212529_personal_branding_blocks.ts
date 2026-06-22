import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_campaign_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"price_text" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Book a Session',
  	"cta_link" varchar DEFAULT '/contact?session_type=personal-brand&source=personal-branding',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"service_id" integer,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_campaign_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"price_text" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Book a Session',
  	"cta_link" varchar DEFAULT '/contact?session_type=personal-brand&source=personal-branding',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"service_id" integer,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_campaign_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"price_text" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Book a Session',
  	"cta_link" varchar DEFAULT '/contact?session_type=personal-brand&source=personal-branding',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"service_id" integer,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_campaign_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"price_text" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Book a Session',
  	"cta_link" varchar DEFAULT '/contact?session_type=personal-brand&source=personal-branding',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"service_id" integer,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "compact_spacing" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_compact_spacing" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_campaign_hero" ADD CONSTRAINT "pages_blocks_campaign_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_campaign_hero" ADD CONSTRAINT "pages_blocks_campaign_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_campaign_hero" ADD CONSTRAINT "_pages_v_blocks_campaign_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_campaign_hero" ADD CONSTRAINT "_pages_v_blocks_campaign_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_campaign_hero" ADD CONSTRAINT "local_landing_pages_blocks_campaign_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_campaign_hero" ADD CONSTRAINT "local_landing_pages_blocks_campaign_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_pricing_cards" ADD CONSTRAINT "local_landing_pages_blocks_pricing_cards_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_pricing_cards" ADD CONSTRAINT "local_landing_pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_campaign_hero" ADD CONSTRAINT "_local_landing_pages_v_blocks_campaign_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_campaign_hero" ADD CONSTRAINT "_local_landing_pages_v_blocks_campaign_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_local_landing_pages_v_blocks_pricing_cards_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_local_landing_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_campaign_hero_order_idx" ON "pages_blocks_campaign_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_campaign_hero_parent_id_idx" ON "pages_blocks_campaign_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_campaign_hero_path_idx" ON "pages_blocks_campaign_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_campaign_hero_image_idx" ON "pages_blocks_campaign_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_pricing_cards_order_idx" ON "pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_parent_id_idx" ON "pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_path_idx" ON "pages_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_cards_service_idx" ON "pages_blocks_pricing_cards" USING btree ("service_id");
  CREATE INDEX "_pages_v_blocks_campaign_hero_order_idx" ON "_pages_v_blocks_campaign_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_campaign_hero_parent_id_idx" ON "_pages_v_blocks_campaign_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_campaign_hero_path_idx" ON "_pages_v_blocks_campaign_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_campaign_hero_image_idx" ON "_pages_v_blocks_campaign_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_order_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_parent_id_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_path_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_cards_service_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("service_id");
  CREATE INDEX "local_landing_pages_blocks_campaign_hero_order_idx" ON "local_landing_pages_blocks_campaign_hero" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_campaign_hero_parent_id_idx" ON "local_landing_pages_blocks_campaign_hero" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_campaign_hero_path_idx" ON "local_landing_pages_blocks_campaign_hero" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_campaign_hero_image_idx" ON "local_landing_pages_blocks_campaign_hero" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_pricing_cards_order_idx" ON "local_landing_pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_pricing_cards_parent_id_idx" ON "local_landing_pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_pricing_cards_path_idx" ON "local_landing_pages_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_pricing_cards_service_idx" ON "local_landing_pages_blocks_pricing_cards" USING btree ("service_id");
  CREATE INDEX "_local_landing_pages_v_blocks_campaign_hero_order_idx" ON "_local_landing_pages_v_blocks_campaign_hero" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_campaign_hero_parent_id_idx" ON "_local_landing_pages_v_blocks_campaign_hero" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_campaign_hero_path_idx" ON "_local_landing_pages_v_blocks_campaign_hero" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_campaign_hero_image_idx" ON "_local_landing_pages_v_blocks_campaign_hero" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_pricing_cards_order_idx" ON "_local_landing_pages_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_pricing_cards_parent_id_idx" ON "_local_landing_pages_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_pricing_cards_path_idx" ON "_local_landing_pages_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_pricing_cards_service_idx" ON "_local_landing_pages_v_blocks_pricing_cards" USING btree ("service_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_campaign_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_campaign_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "local_landing_pages_blocks_campaign_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "local_landing_pages_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_landing_pages_v_blocks_campaign_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_landing_pages_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_campaign_hero" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_campaign_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "local_landing_pages_blocks_campaign_hero" CASCADE;
  DROP TABLE "local_landing_pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_campaign_hero" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_pricing_cards" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "compact_spacing";
  ALTER TABLE "_pages_v" DROP COLUMN "version_compact_spacing";`)
}
