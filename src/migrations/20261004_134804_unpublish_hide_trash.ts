import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_portfolio_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_packages_tier" AS ENUM('essential', 'professional', 'premium');
  CREATE TYPE "public"."enum__services_v_version_niche_key" AS ENUM('personal-brand', 'portrait', 'model-tests', 'commercial');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_portfolio_categories_v_version_subcategories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"cover_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_eyebrow" varchar DEFAULT 'Selected Work',
  	"version_subtitle" varchar,
  	"version_cover_image_id" integer,
  	"version_description" jsonb,
  	"version_has_subcategories" boolean DEFAULT false,
  	"version_display_order" numeric,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolio_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_version_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tier" "enum__services_v_version_packages_tier",
  	"price_from" numeric,
  	"price_label" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Inquire',
  	"popular" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_niche_key" "enum__services_v_version_niche_key",
  	"version_eyebrow" varchar,
  	"version_tagline" varchar,
  	"version_description" jsonb,
  	"version_hero_image_id" integer,
  	"version_cover_image_id" integer,
  	"version_has_packages" boolean DEFAULT true,
  	"version_commercial_note" jsonb,
  	"version_what_to_wear_tip" jsonb,
  	"version_display_order" numeric,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"testimonials_id" integer,
  	"faq_entries_id" integer
  );
  
  ALTER TABLE "portfolio_categories" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "portfolio_categories" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "services_process_steps" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "niche_key" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero_slider" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_media_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_campaign_hero" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_intro_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_portfolio_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_services_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_testimonial_spread" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_testimonials_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_about_preview" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_blog_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_contact_split" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_pull_quote" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_process_steps" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_pricing_cards" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_newsletter_form" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_faq_accordion" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_spacer" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_slider" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_media_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_campaign_hero" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_intro_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_portfolio_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_services_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_testimonial_spread" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_testimonials_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_about_preview" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_blog_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_contact_split" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_image_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_pull_quote" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_pricing_cards" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_newsletter_form" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_rich_text_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_spacer" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "portfolio_categories" ADD COLUMN "_status" "enum_portfolio_categories_status" DEFAULT 'draft';
  ALTER TABLE "portfolio_series" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_portfolio_series_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  ALTER TABLE "services" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "services" ADD COLUMN "_status" "enum_services_status" DEFAULT 'draft';
  ALTER TABLE "local_landing_pages_blocks_hero_slider" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_hero_media_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_campaign_hero" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_intro_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_portfolio_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_services_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_testimonial_spread" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_testimonials_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_about_preview" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_blog_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_contact_split" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_image_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_pull_quote" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_process_steps" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_pricing_cards" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_cta_banner" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_newsletter_form" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_faq_accordion" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_rich_text_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_media_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_spacer" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_city_highlight" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_service_for_city" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_local_locations_list" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "local_landing_pages_blocks_nearby_areas_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_slider" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_media_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_campaign_hero" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_intro_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_portfolio_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_services_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_testimonial_spread" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_testimonials_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_about_preview" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_blog_teaser" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_contact_split" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_image_pair" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_pull_quote" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_process_steps" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_pricing_cards" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_cta_banner" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_newsletter_form" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_faq_accordion" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_rich_text_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_media_block" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_spacer" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_city_highlight" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_service_for_city" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_local_locations_list" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_local_landing_pages_v_blocks_nearby_areas_grid" ADD COLUMN "hide_on_site" boolean DEFAULT false;
  ALTER TABLE "_portfolio_categories_v_version_subcategories" ADD CONSTRAINT "_portfolio_categories_v_version_subcategories_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_categories_v_version_subcategories" ADD CONSTRAINT "_portfolio_categories_v_version_subcategories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_categories_v" ADD CONSTRAINT "_portfolio_categories_v_parent_id_portfolio_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_categories_v" ADD CONSTRAINT "_portfolio_categories_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_categories_v" ADD CONSTRAINT "_portfolio_categories_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_packages_features" ADD CONSTRAINT "_services_v_version_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_packages" ADD CONSTRAINT "_services_v_version_packages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_packages" ADD CONSTRAINT "_services_v_version_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_process_steps" ADD CONSTRAINT "_services_v_version_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_portfolio_categories_v_version_subcategories_order_idx" ON "_portfolio_categories_v_version_subcategories" USING btree ("_order");
  CREATE INDEX "_portfolio_categories_v_version_subcategories_parent_id_idx" ON "_portfolio_categories_v_version_subcategories" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_categories_v_version_subcategories_cover_imag_idx" ON "_portfolio_categories_v_version_subcategories" USING btree ("cover_image_id");
  CREATE INDEX "_portfolio_categories_v_parent_idx" ON "_portfolio_categories_v" USING btree ("parent_id");
  CREATE INDEX "_portfolio_categories_v_version_version_slug_idx" ON "_portfolio_categories_v" USING btree ("version_slug");
  CREATE INDEX "_portfolio_categories_v_version_version_cover_image_idx" ON "_portfolio_categories_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_portfolio_categories_v_version_seo_version_seo_og_image_idx" ON "_portfolio_categories_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_portfolio_categories_v_version_version_updated_at_idx" ON "_portfolio_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolio_categories_v_version_version_created_at_idx" ON "_portfolio_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolio_categories_v_version_version__status_idx" ON "_portfolio_categories_v" USING btree ("version__status");
  CREATE INDEX "_portfolio_categories_v_created_at_idx" ON "_portfolio_categories_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_categories_v_updated_at_idx" ON "_portfolio_categories_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_categories_v_latest_idx" ON "_portfolio_categories_v" USING btree ("latest");
  CREATE INDEX "_services_v_version_packages_features_order_idx" ON "_services_v_version_packages_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_packages_features_parent_id_idx" ON "_services_v_version_packages_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_packages_order_idx" ON "_services_v_version_packages" USING btree ("_order");
  CREATE INDEX "_services_v_version_packages_parent_id_idx" ON "_services_v_version_packages" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_packages_image_idx" ON "_services_v_version_packages" USING btree ("image_id");
  CREATE INDEX "_services_v_version_process_steps_order_idx" ON "_services_v_version_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_version_process_steps_parent_id_idx" ON "_services_v_version_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_hero_image_idx" ON "_services_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_v_version_version_cover_image_idx" ON "_services_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_services_v_version_seo_version_seo_og_image_idx" ON "_services_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version_deleted_at_idx" ON "_services_v" USING btree ("version_deleted_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_portfolio_series_id_idx" ON "_services_v_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_faq_entries_id_idx" ON "_services_v_rels" USING btree ("faq_entries_id");
  CREATE INDEX "portfolio_categories__status_idx" ON "portfolio_categories" USING btree ("_status");
  CREATE INDEX "portfolio_series_deleted_at_idx" ON "portfolio_series" USING btree ("deleted_at");
  CREATE INDEX "_portfolio_series_v_version_version_deleted_at_idx" ON "_portfolio_series_v" USING btree ("version_deleted_at");
  CREATE INDEX "services_deleted_at_idx" ON "services" USING btree ("deleted_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");`)

  // Keep current visibility. New `_status` columns default to 'draft', and the
  // new published-only read access would otherwise hide every existing service
  // and portfolio category. City landing pages were saved as drafts but have
  // been live (Unpublish wasn't enforced before) — publish them so they stay up.
  await db.execute(sql`
   UPDATE "services" SET "_status" = 'published';
   UPDATE "portfolio_categories" SET "_status" = 'published';
   UPDATE "local_landing_pages" SET "_status" = 'published' WHERE "_status" = 'draft';
   UPDATE "_local_landing_pages_v" SET "version__status" = 'published' WHERE "latest" = true AND "version__status" = 'draft';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_portfolio_categories_v_version_subcategories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_portfolio_categories_v_version_subcategories" CASCADE;
  DROP TABLE "_portfolio_categories_v" CASCADE;
  DROP TABLE "_services_v_version_packages_features" CASCADE;
  DROP TABLE "_services_v_version_packages" CASCADE;
  DROP TABLE "_services_v_version_process_steps" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP INDEX "portfolio_categories__status_idx";
  DROP INDEX "portfolio_series_deleted_at_idx";
  DROP INDEX "_portfolio_series_v_version_version_deleted_at_idx";
  DROP INDEX "services_deleted_at_idx";
  DROP INDEX "services__status_idx";
  ALTER TABLE "portfolio_categories" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "portfolio_categories" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "services_process_steps" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "niche_key" SET NOT NULL;
  ALTER TABLE "pages_blocks_hero_slider" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_hero_media_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_campaign_hero" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_intro_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_portfolio_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_services_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_testimonial_spread" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_testimonials_grid" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_about_preview" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_blog_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_contact_split" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_image_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_pull_quote" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_process_steps" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_pricing_cards" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_newsletter_form" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_faq_accordion" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_rich_text_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "pages_blocks_spacer" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_hero_slider" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_hero_media_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_campaign_hero" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_intro_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_portfolio_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_services_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_testimonial_spread" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_testimonials_grid" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_about_preview" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_blog_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_contact_split" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_image_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_pull_quote" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_process_steps" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_pricing_cards" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_cta_banner" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_newsletter_form" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_faq_accordion" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_rich_text_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_pages_v_blocks_spacer" DROP COLUMN "hide_on_site";
  ALTER TABLE "portfolio_categories" DROP COLUMN "_status";
  ALTER TABLE "portfolio_series" DROP COLUMN "deleted_at";
  ALTER TABLE "_portfolio_series_v" DROP COLUMN "version_deleted_at";
  ALTER TABLE "services" DROP COLUMN "deleted_at";
  ALTER TABLE "services" DROP COLUMN "_status";
  ALTER TABLE "local_landing_pages_blocks_hero_slider" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_hero_media_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_campaign_hero" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_intro_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_portfolio_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_services_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_testimonial_spread" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_testimonials_grid" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_about_preview" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_blog_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_contact_split" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_image_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_pull_quote" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_process_steps" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_pricing_cards" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_cta_banner" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_newsletter_form" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_faq_accordion" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_rich_text_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_media_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_spacer" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_city_highlight" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_service_for_city" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_local_locations_list" DROP COLUMN "hide_on_site";
  ALTER TABLE "local_landing_pages_blocks_nearby_areas_grid" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_hero_slider" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_hero_media_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_campaign_hero" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_intro_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_portfolio_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_services_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_testimonial_spread" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_testimonials_grid" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_about_preview" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_blog_teaser" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_contact_split" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_image_pair" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_pull_quote" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_process_steps" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_pricing_cards" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_cta_banner" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_newsletter_form" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_faq_accordion" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_rich_text_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_media_block" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_spacer" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_city_highlight" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_service_for_city" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_local_locations_list" DROP COLUMN "hide_on_site";
  ALTER TABLE "_local_landing_pages_v_blocks_nearby_areas_grid" DROP COLUMN "hide_on_site";
  DROP TYPE "public"."enum_portfolio_categories_status";
  DROP TYPE "public"."enum__portfolio_categories_v_version_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_packages_tier";
  DROP TYPE "public"."enum__services_v_version_niche_key";
  DROP TYPE "public"."enum__services_v_version_status";`)
}
