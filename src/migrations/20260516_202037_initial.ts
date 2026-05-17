import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_intro_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_services_teaser_display_mode" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_contact_split_form_variant" AS ENUM('short', 'full');
  CREATE TYPE "public"."enum_pages_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xl');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_intro_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_services_teaser_display_mode" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_split_form_variant" AS ENUM('short', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xl');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_posts_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum_blog_posts_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum_blog_posts_niche_tags_niche" AS ENUM('personal-brand', 'portrait', 'model-tests', 'commercial');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum__blog_posts_v_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum__blog_posts_v_version_niche_tags_niche" AS ENUM('personal-brand', 'portrait', 'model-tests', 'commercial');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_portfolio_series_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_series_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tags_type" AS ENUM('location', 'mood', 'theme', 'style', 'season');
  CREATE TYPE "public"."enum_services_packages_tier" AS ENUM('essential', 'professional', 'premium');
  CREATE TYPE "public"."enum_services_niche_key" AS ENUM('personal-brand', 'portrait', 'model-tests', 'commercial');
  CREATE TYPE "public"."enum_faq_entries_category" AS ENUM('general', 'pricing', 'process', 'preparation', 'delivery');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_intro_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_services_teaser_display_mode" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_testimonials_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_contact_split_form_variant" AS ENUM('short', 'full');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum_local_landing_pages_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xl');
  CREATE TYPE "public"."enum_local_landing_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_intro_block_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_services_teaser_display_mode" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_testimonials_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_contact_split_form_variant" AS ENUM('short', 'full');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_pull_quote_style" AS ENUM('bordered', 'plain');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_media_block_width" AS ENUM('narrow', 'wide', 'full');
  CREATE TYPE "public"."enum__local_landing_pages_v_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xl');
  CREATE TYPE "public"."enum__local_landing_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_budget" AS ENUM('under-500', '500-1000', '1000-2000', '2000-plus', 'not-sure');
  CREATE TYPE "public"."enum_leads_referral_source" AS ENUM('google', 'instagram', 'pinterest', 'referral', 'other');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'qualified', 'booked', 'declined', 'spam');
  CREATE TYPE "public"."enum_leads_crm_sync_status" AS ENUM('not-synced', 'synced', 'failed');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lead_magnet_settings_placement" AS ENUM('popup', 'footer-block', 'blog-inline');
  CREATE TYPE "public"."enum_lead_magnet_settings_trigger" AS ENUM('delay-30s', 'exit-intent', 'scroll-50pct');
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('instagram', 'pinterest', 'tiktok', 'facebook', 'youtube', 'linkedin');
  CREATE TABLE "pages_blocks_hero_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"tagline" varchar,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"image_position" "enum_pages_blocks_intro_block_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtitle" varchar,
  	"view_all_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"display_mode" "enum_pages_blocks_services_teaser_display_mode" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_spread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_testimonials_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Read my story',
  	"cta_link" varchar DEFAULT '/about',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"view_all_link" varchar DEFAULT '/journal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"form_variant" "enum_pages_blocks_contact_split_form_variant" DEFAULT 'short',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_pair_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum_pages_blocks_pull_quote_style" DEFAULT 'bordered',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"placeholder" varchar DEFAULT 'Your email address',
  	"flodesk_tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum_pages_blocks_media_block_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_spacer_size" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"is_homepage" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"blog_posts_id" integer,
  	"faq_entries_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"tagline" varchar,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"image_position" "enum__pages_v_blocks_intro_block_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtitle" varchar,
  	"view_all_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"display_mode" "enum__pages_v_blocks_services_teaser_display_mode" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_spread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_testimonials_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Read my story',
  	"cta_link" varchar DEFAULT '/about',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"view_all_link" varchar DEFAULT '/journal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"form_variant" "enum__pages_v_blocks_contact_split_form_variant" DEFAULT 'short',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_pair_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum__pages_v_blocks_pull_quote_style" DEFAULT 'bordered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"placeholder" varchar DEFAULT 'Your email address',
  	"flodesk_tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum__pages_v_blocks_media_block_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_spacer_size" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_is_homepage" boolean DEFAULT false,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"blog_posts_id" integer,
  	"faq_entries_id" integer
  );
  
  CREATE TABLE "blog_posts_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum_blog_posts_blocks_media_block_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum_blog_posts_blocks_pull_quote_style" DEFAULT 'bordered',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_tip_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tip" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_resource_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"label" varchar DEFAULT 'Visit →',
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_blocks_blog_lead_magnet_inline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"pdf_file_id" integer,
  	"flodesk_tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_posts_city_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar
  );
  
  CREATE TABLE "blog_posts_niche_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"niche" "enum_blog_posts_niche_tags_niche"
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"publish_date" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'Maria Levi',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_posts_id" integer,
  	"portfolio_series_id" integer
  );
  
  CREATE TABLE "_blog_posts_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum__blog_posts_v_blocks_media_block_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum__blog_posts_v_blocks_pull_quote_style" DEFAULT 'bordered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_tip_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tip" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_resource_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"label" varchar DEFAULT 'Visit →',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_blocks_blog_lead_magnet_inline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"pdf_file_id" integer,
  	"flodesk_tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_city_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_niche_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"niche" "enum__blog_posts_v_version_niche_tags_niche",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_publish_date" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'Maria Levi',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_posts_id" integer,
  	"portfolio_series_id" integer
  );
  
  CREATE TABLE "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"cover_image_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_categories_subcategories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"cover_image_id" integer
  );
  
  CREATE TABLE "portfolio_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar DEFAULT 'Selected Work',
  	"subtitle" varchar,
  	"cover_image_id" integer,
  	"description" jsonb,
  	"has_subcategories" boolean DEFAULT false,
  	"display_order" numeric,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_series_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "portfolio_series_city_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar
  );
  
  CREATE TABLE "portfolio_series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category_id" integer,
  	"subcategory" varchar,
  	"eyebrow" varchar,
  	"tagline" varchar,
  	"description" jsonb,
  	"cover_image_id" integer,
  	"hero_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_portfolio_series_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "portfolio_series_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"portfolio_series_id" integer
  );
  
  CREATE TABLE "_portfolio_series_v_version_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_series_v_version_city_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_series_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_subcategory" varchar,
  	"version_eyebrow" varchar,
  	"version_tagline" varchar,
  	"version_description" jsonb,
  	"version_cover_image_id" integer,
  	"version_hero_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_display_order" numeric,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolio_series_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_portfolio_series_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"portfolio_series_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_tags_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tier" "enum_services_packages_tier",
  	"price_from" numeric,
  	"price_label" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Inquire',
  	"popular" boolean DEFAULT false
  );
  
  CREATE TABLE "services_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"niche_key" "enum_services_niche_key" NOT NULL,
  	"eyebrow" varchar,
  	"tagline" varchar,
  	"description" jsonb,
  	"hero_image_id" integer,
  	"cover_image_id" integer,
  	"has_packages" boolean DEFAULT true,
  	"commercial_note" jsonb,
  	"what_to_wear_tip" jsonb,
  	"display_order" numeric,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"testimonials_id" integer,
  	"faq_entries_id" integer
  );
  
  CREATE TABLE "faq_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faq_entries_category",
  	"related_niche_id" integer,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"quote_headline" varchar,
  	"client_photo_id" integer,
  	"session_type_id" integer,
  	"related_series_id" integer,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric,
  	"date_received" timestamp(3) with time zone,
  	"consent_verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "local_landing_pages_blocks_hero_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "local_landing_pages_blocks_hero_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"tagline" varchar,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"image_position" "enum_local_landing_pages_blocks_intro_block_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_portfolio_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtitle" varchar,
  	"view_all_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"display_mode" "enum_local_landing_pages_blocks_services_teaser_display_mode" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_testimonial_spread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_local_landing_pages_blocks_testimonials_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_about_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Read my story',
  	"cta_link" varchar DEFAULT '/about',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"view_all_link" varchar DEFAULT '/journal',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_contact_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"form_variant" "enum_local_landing_pages_blocks_contact_split_form_variant" DEFAULT 'short',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_image_pair_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "local_landing_pages_blocks_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum_local_landing_pages_blocks_pull_quote_style" DEFAULT 'bordered',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_newsletter_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"placeholder" varchar DEFAULT 'Your email address',
  	"flodesk_tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum_local_landing_pages_blocks_media_block_width" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_local_landing_pages_blocks_spacer_size" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_city_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_service_for_city" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer,
  	"local_headline" varchar,
  	"local_description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_local_locations_list_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_local_locations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_nearby_areas_grid_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "local_landing_pages_blocks_nearby_areas_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_popular_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "local_landing_pages_nearby_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "local_landing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"city_name" varchar,
  	"slug" varchar,
  	"city_state" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"hero_image_id" integer,
  	"intro" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_local_landing_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "local_landing_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"blog_posts_id" integer,
  	"faq_entries_id" integer
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_hero_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_hero_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"tagline" varchar,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_intro_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"image_position" "enum__local_landing_pages_v_blocks_intro_block_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_portfolio_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subtitle" varchar,
  	"view_all_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_services_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"display_mode" "enum__local_landing_pages_v_blocks_services_teaser_display_mode" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_testimonial_spread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__local_landing_pages_v_blocks_testimonials_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_about_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'Read my story',
  	"cta_link" varchar DEFAULT '/about',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_blog_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"view_all_link" varchar DEFAULT '/journal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_contact_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"form_variant" "enum__local_landing_pages_v_blocks_contact_split_form_variant" DEFAULT 'short',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_image_pair_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_pull_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"style" "enum__local_landing_pages_v_blocks_pull_quote_style" DEFAULT 'bordered',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_newsletter_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"placeholder" varchar DEFAULT 'Your email address',
  	"flodesk_tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"width" "enum__local_landing_pages_v_blocks_media_block_width" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__local_landing_pages_v_blocks_spacer_size" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_city_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_service_for_city" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"service_id" integer,
  	"local_headline" varchar,
  	"local_description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_local_locations_list_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_local_locations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_nearby_areas_grid_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_nearby_areas_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_version_popular_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_version_nearby_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_city_name" varchar,
  	"version_slug" varchar,
  	"version_city_state" varchar,
  	"version_headline" varchar,
  	"version_subhead" varchar,
  	"version_hero_image_id" integer,
  	"version_intro" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__local_landing_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_local_landing_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"blog_posts_id" integer,
  	"faq_entries_id" integer
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"session_type" varchar,
  	"preferred_date" timestamp(3) with time zone,
  	"location" varchar,
  	"budget" "enum_leads_budget",
  	"referral_source" "enum_leads_referral_source",
  	"message" varchar,
  	"page_submitted_from" varchar,
  	"user_agent" varchar,
  	"submitted_at" timestamp(3) with time zone,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"crm_sync_status" "enum_leads_crm_sync_status" DEFAULT 'not-synced',
  	"crm_external_id" varchar,
  	"gdpr_anonymized_at" timestamp(3) with time zone,
  	"gdpr_anonymized_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit_photographer" varchar DEFAULT 'Maria Levi',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"status_code" "enum_redirects_status_code" DEFAULT '301' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"disabled" boolean DEFAULT false,
  	"last_login" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"blog_posts_id" integer,
  	"blog_categories_id" integer,
  	"portfolio_categories_id" integer,
  	"portfolio_series_id" integer,
  	"tags_id" integer,
  	"services_id" integer,
  	"faq_entries_id" integer,
  	"testimonials_id" integer,
  	"local_landing_pages_id" integer,
  	"leads_id" integer,
  	"media_id" integer,
  	"redirects_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_page_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "about_page_credits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'About · Full Story',
  	"headline" varchar,
  	"hero_image_id" integer,
  	"body_part1" jsonb,
  	"pull_quote" varchar,
  	"pull_quote_attribution" varchar,
  	"body_part2" jsonb,
  	"body_part3" jsonb,
  	"signoff" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_image_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_credits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_eyebrow" varchar DEFAULT 'About · Full Story',
  	"version_headline" varchar,
  	"version_hero_image_id" integer,
  	"version_body_part1" jsonb,
  	"version_pull_quote" varchar,
  	"version_pull_quote_attribution" varchar,
  	"version_body_part2" jsonb,
  	"version_body_part3" jsonb,
  	"version_signoff" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "contact_page_referral_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Let''s work together',
  	"headline" varchar NOT NULL,
  	"intro" jsonb,
  	"hero_image_id" integer,
  	"response_time" varchar DEFAULT 'Response time: 1–2 business days',
  	"inquiries_email" varchar DEFAULT 'stalevs@gmail.com' NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"intro" jsonb,
  	"hero_image_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_index" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"subtitle" jsonb,
  	"tax_note_override" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_index_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "lead_magnet_settings_placement" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_lead_magnet_settings_placement",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "lead_magnet_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"pdf_file_id" integer,
  	"flodesk_tag" varchar,
  	"trigger" "enum_lead_magnet_settings_trigger" DEFAULT 'delay-30s',
  	"success_message" varchar DEFAULT 'Check your email for the guide',
  	"consent_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_main_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_main_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "navigation_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_navigation_v_version_main_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_main_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Maria Levi' NOT NULL,
  	"tagline" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"location_city" varchar,
  	"location_region" varchar,
  	"location_country" varchar DEFAULT 'US',
  	"pic_time_url" varchar,
  	"tax_note" varchar DEFAULT 'Prices listed are before applicable sales tax.',
  	"travel_note" varchar,
  	"additional_note" varchar,
  	"inquiry_autoreply" jsonb,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_slider_slides" ADD CONSTRAINT "pages_blocks_hero_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_slider_slides" ADD CONSTRAINT "pages_blocks_hero_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_slider" ADD CONSTRAINT "pages_blocks_hero_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_block" ADD CONSTRAINT "pages_blocks_intro_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_block" ADD CONSTRAINT "pages_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_teaser" ADD CONSTRAINT "pages_blocks_portfolio_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_teaser" ADD CONSTRAINT "pages_blocks_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_spread" ADD CONSTRAINT "pages_blocks_testimonial_spread_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_spread" ADD CONSTRAINT "pages_blocks_testimonial_spread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid" ADD CONSTRAINT "pages_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_preview" ADD CONSTRAINT "pages_blocks_about_preview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_preview" ADD CONSTRAINT "pages_blocks_about_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_teaser" ADD CONSTRAINT "pages_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_split" ADD CONSTRAINT "pages_blocks_contact_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_split" ADD CONSTRAINT "pages_blocks_contact_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_pair_images" ADD CONSTRAINT "pages_blocks_image_pair_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_pair_images" ADD CONSTRAINT "pages_blocks_image_pair_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_pair" ADD CONSTRAINT "pages_blocks_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pull_quote" ADD CONSTRAINT "pages_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_form" ADD CONSTRAINT "pages_blocks_newsletter_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slider_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slider_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slider" ADD CONSTRAINT "_pages_v_blocks_hero_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_block" ADD CONSTRAINT "_pages_v_blocks_intro_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_block" ADD CONSTRAINT "_pages_v_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_teaser" ADD CONSTRAINT "_pages_v_blocks_portfolio_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_teaser" ADD CONSTRAINT "_pages_v_blocks_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_spread" ADD CONSTRAINT "_pages_v_blocks_testimonial_spread_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_spread" ADD CONSTRAINT "_pages_v_blocks_testimonial_spread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_grid" ADD CONSTRAINT "_pages_v_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_preview" ADD CONSTRAINT "_pages_v_blocks_about_preview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_preview" ADD CONSTRAINT "_pages_v_blocks_about_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_teaser" ADD CONSTRAINT "_pages_v_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_split" ADD CONSTRAINT "_pages_v_blocks_contact_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_split" ADD CONSTRAINT "_pages_v_blocks_contact_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_pair_images" ADD CONSTRAINT "_pages_v_blocks_image_pair_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_pair_images" ADD CONSTRAINT "_pages_v_blocks_image_pair_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_pair" ADD CONSTRAINT "_pages_v_blocks_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pull_quote" ADD CONSTRAINT "_pages_v_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_form" ADD CONSTRAINT "_pages_v_blocks_newsletter_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_block" ADD CONSTRAINT "_pages_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer" ADD CONSTRAINT "_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_rich_text_block" ADD CONSTRAINT "blog_posts_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_media_block" ADD CONSTRAINT "blog_posts_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_media_block" ADD CONSTRAINT "blog_posts_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_pull_quote" ADD CONSTRAINT "blog_posts_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_quote" ADD CONSTRAINT "blog_posts_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_image_grid_images" ADD CONSTRAINT "blog_posts_blocks_blog_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_image_grid_images" ADD CONSTRAINT "blog_posts_blocks_blog_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts_blocks_blog_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_image_grid" ADD CONSTRAINT "blog_posts_blocks_blog_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_video_embed" ADD CONSTRAINT "blog_posts_blocks_blog_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_tip_callout" ADD CONSTRAINT "blog_posts_blocks_blog_tip_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_resource_link" ADD CONSTRAINT "blog_posts_blocks_blog_resource_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "blog_posts_blocks_blog_lead_magnet_inline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "blog_posts_blocks_blog_lead_magnet_inline_pdf_file_id_media_id_fk" FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "blog_posts_blocks_blog_lead_magnet_inline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_city_tags" ADD CONSTRAINT "blog_posts_city_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_niche_tags" ADD CONSTRAINT "blog_posts_niche_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_rich_text_block" ADD CONSTRAINT "_blog_posts_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_media_block" ADD CONSTRAINT "_blog_posts_v_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_media_block" ADD CONSTRAINT "_blog_posts_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_pull_quote" ADD CONSTRAINT "_blog_posts_v_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_quote" ADD CONSTRAINT "_blog_posts_v_blocks_blog_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_image_grid_images" ADD CONSTRAINT "_blog_posts_v_blocks_blog_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_image_grid_images" ADD CONSTRAINT "_blog_posts_v_blocks_blog_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v_blocks_blog_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_image_grid" ADD CONSTRAINT "_blog_posts_v_blocks_blog_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_video_embed" ADD CONSTRAINT "_blog_posts_v_blocks_blog_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_tip_callout" ADD CONSTRAINT "_blog_posts_v_blocks_blog_tip_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_resource_link" ADD CONSTRAINT "_blog_posts_v_blocks_blog_resource_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "_blog_posts_v_blocks_blog_lead_magnet_inline_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "_blog_posts_v_blocks_blog_lead_magnet_inline_pdf_file_id_media_id_fk" FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_blocks_blog_lead_magnet_inline" ADD CONSTRAINT "_blog_posts_v_blocks_blog_lead_magnet_inline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_city_tags" ADD CONSTRAINT "_blog_posts_v_version_city_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_niche_tags" ADD CONSTRAINT "_blog_posts_v_version_niche_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_categories_subcategories" ADD CONSTRAINT "portfolio_categories_subcategories_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_categories_subcategories" ADD CONSTRAINT "portfolio_categories_subcategories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_categories" ADD CONSTRAINT "portfolio_categories_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_categories" ADD CONSTRAINT "portfolio_categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series_photos" ADD CONSTRAINT "portfolio_series_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series_photos" ADD CONSTRAINT "portfolio_series_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_series_city_tags" ADD CONSTRAINT "portfolio_series_city_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_series" ADD CONSTRAINT "portfolio_series_category_id_portfolio_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series" ADD CONSTRAINT "portfolio_series_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series" ADD CONSTRAINT "portfolio_series_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series" ADD CONSTRAINT "portfolio_series_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_series_rels" ADD CONSTRAINT "portfolio_series_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_series_rels" ADD CONSTRAINT "portfolio_series_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_series_rels" ADD CONSTRAINT "portfolio_series_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_version_photos" ADD CONSTRAINT "_portfolio_series_v_version_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_version_photos" ADD CONSTRAINT "_portfolio_series_v_version_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_series_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_version_city_tags" ADD CONSTRAINT "_portfolio_series_v_version_city_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_series_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v" ADD CONSTRAINT "_portfolio_series_v_parent_id_portfolio_series_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v" ADD CONSTRAINT "_portfolio_series_v_version_category_id_portfolio_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v" ADD CONSTRAINT "_portfolio_series_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v" ADD CONSTRAINT "_portfolio_series_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v" ADD CONSTRAINT "_portfolio_series_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_rels" ADD CONSTRAINT "_portfolio_series_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portfolio_series_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_rels" ADD CONSTRAINT "_portfolio_series_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_series_v_rels" ADD CONSTRAINT "_portfolio_series_v_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_packages_features" ADD CONSTRAINT "services_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_packages" ADD CONSTRAINT "services_packages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_packages" ADD CONSTRAINT "services_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_process_steps" ADD CONSTRAINT "services_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_entries" ADD CONSTRAINT "faq_entries_related_niche_id_services_id_fk" FOREIGN KEY ("related_niche_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_client_photo_id_media_id_fk" FOREIGN KEY ("client_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_session_type_id_services_id_fk" FOREIGN KEY ("session_type_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_related_series_id_portfolio_series_id_fk" FOREIGN KEY ("related_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_slider_slides" ADD CONSTRAINT "local_landing_pages_blocks_hero_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_slider_slides" ADD CONSTRAINT "local_landing_pages_blocks_hero_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages_blocks_hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_slider" ADD CONSTRAINT "local_landing_pages_blocks_hero_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_intro_block" ADD CONSTRAINT "local_landing_pages_blocks_intro_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_intro_block" ADD CONSTRAINT "local_landing_pages_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_portfolio_teaser" ADD CONSTRAINT "local_landing_pages_blocks_portfolio_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_services_teaser" ADD CONSTRAINT "local_landing_pages_blocks_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_testimonial_spread" ADD CONSTRAINT "local_landing_pages_blocks_testimonial_spread_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_testimonial_spread" ADD CONSTRAINT "local_landing_pages_blocks_testimonial_spread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_testimonials_grid" ADD CONSTRAINT "local_landing_pages_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_about_preview" ADD CONSTRAINT "local_landing_pages_blocks_about_preview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_about_preview" ADD CONSTRAINT "local_landing_pages_blocks_about_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_blog_teaser" ADD CONSTRAINT "local_landing_pages_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_contact_split" ADD CONSTRAINT "local_landing_pages_blocks_contact_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_contact_split" ADD CONSTRAINT "local_landing_pages_blocks_contact_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_image_pair_images" ADD CONSTRAINT "local_landing_pages_blocks_image_pair_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_image_pair_images" ADD CONSTRAINT "local_landing_pages_blocks_image_pair_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages_blocks_image_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_image_pair" ADD CONSTRAINT "local_landing_pages_blocks_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_pull_quote" ADD CONSTRAINT "local_landing_pages_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_process_steps_steps" ADD CONSTRAINT "local_landing_pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_process_steps" ADD CONSTRAINT "local_landing_pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_cta_banner" ADD CONSTRAINT "local_landing_pages_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_cta_banner" ADD CONSTRAINT "local_landing_pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_newsletter_form" ADD CONSTRAINT "local_landing_pages_blocks_newsletter_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_faq_accordion" ADD CONSTRAINT "local_landing_pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_rich_text_block" ADD CONSTRAINT "local_landing_pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_media_block" ADD CONSTRAINT "local_landing_pages_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_media_block" ADD CONSTRAINT "local_landing_pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_spacer" ADD CONSTRAINT "local_landing_pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_city_highlight" ADD CONSTRAINT "local_landing_pages_blocks_city_highlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_city_highlight" ADD CONSTRAINT "local_landing_pages_blocks_city_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_service_for_city" ADD CONSTRAINT "local_landing_pages_blocks_service_for_city_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_service_for_city" ADD CONSTRAINT "local_landing_pages_blocks_service_for_city_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_local_locations_list_locations" ADD CONSTRAINT "local_landing_pages_blocks_local_locations_list_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages_blocks_local_locations_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_local_locations_list" ADD CONSTRAINT "local_landing_pages_blocks_local_locations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_nearby_areas_grid_areas" ADD CONSTRAINT "local_landing_pages_blocks_nearby_areas_grid_areas_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_nearby_areas_grid_areas" ADD CONSTRAINT "local_landing_pages_blocks_nearby_areas_grid_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages_blocks_nearby_areas_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_nearby_areas_grid" ADD CONSTRAINT "local_landing_pages_blocks_nearby_areas_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_popular_locations" ADD CONSTRAINT "local_landing_pages_popular_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_nearby_areas" ADD CONSTRAINT "local_landing_pages_nearby_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages" ADD CONSTRAINT "local_landing_pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages" ADD CONSTRAINT "local_landing_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_rels" ADD CONSTRAINT "local_landing_pages_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_slider_slides" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_slider_slides" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v_blocks_hero_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_slider" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_intro_block" ADD CONSTRAINT "_local_landing_pages_v_blocks_intro_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_intro_block" ADD CONSTRAINT "_local_landing_pages_v_blocks_intro_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_portfolio_teaser" ADD CONSTRAINT "_local_landing_pages_v_blocks_portfolio_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_services_teaser" ADD CONSTRAINT "_local_landing_pages_v_blocks_services_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_testimonial_spread" ADD CONSTRAINT "_local_landing_pages_v_blocks_testimonial_spread_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_testimonial_spread" ADD CONSTRAINT "_local_landing_pages_v_blocks_testimonial_spread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_testimonials_grid" ADD CONSTRAINT "_local_landing_pages_v_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_about_preview" ADD CONSTRAINT "_local_landing_pages_v_blocks_about_preview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_about_preview" ADD CONSTRAINT "_local_landing_pages_v_blocks_about_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_blog_teaser" ADD CONSTRAINT "_local_landing_pages_v_blocks_blog_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_contact_split" ADD CONSTRAINT "_local_landing_pages_v_blocks_contact_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_contact_split" ADD CONSTRAINT "_local_landing_pages_v_blocks_contact_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_image_pair_images" ADD CONSTRAINT "_local_landing_pages_v_blocks_image_pair_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_image_pair_images" ADD CONSTRAINT "_local_landing_pages_v_blocks_image_pair_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v_blocks_image_pair"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_image_pair" ADD CONSTRAINT "_local_landing_pages_v_blocks_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_pull_quote" ADD CONSTRAINT "_local_landing_pages_v_blocks_pull_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_local_landing_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_process_steps" ADD CONSTRAINT "_local_landing_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_cta_banner" ADD CONSTRAINT "_local_landing_pages_v_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_cta_banner" ADD CONSTRAINT "_local_landing_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_newsletter_form" ADD CONSTRAINT "_local_landing_pages_v_blocks_newsletter_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_local_landing_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_rich_text_block" ADD CONSTRAINT "_local_landing_pages_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_media_block" ADD CONSTRAINT "_local_landing_pages_v_blocks_media_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_media_block" ADD CONSTRAINT "_local_landing_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_spacer" ADD CONSTRAINT "_local_landing_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_city_highlight" ADD CONSTRAINT "_local_landing_pages_v_blocks_city_highlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_city_highlight" ADD CONSTRAINT "_local_landing_pages_v_blocks_city_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_service_for_city" ADD CONSTRAINT "_local_landing_pages_v_blocks_service_for_city_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_service_for_city" ADD CONSTRAINT "_local_landing_pages_v_blocks_service_for_city_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_local_locations_list_locations" ADD CONSTRAINT "_local_landing_pages_v_blocks_local_locations_list_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v_blocks_local_locations_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_local_locations_list" ADD CONSTRAINT "_local_landing_pages_v_blocks_local_locations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_nearby_areas_grid_areas" ADD CONSTRAINT "_local_landing_pages_v_blocks_nearby_areas_grid_areas_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_nearby_areas_grid_areas" ADD CONSTRAINT "_local_landing_pages_v_blocks_nearby_areas_grid_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v_blocks_nearby_areas_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_nearby_areas_grid" ADD CONSTRAINT "_local_landing_pages_v_blocks_nearby_areas_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_version_popular_locations" ADD CONSTRAINT "_local_landing_pages_v_version_popular_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_version_nearby_areas" ADD CONSTRAINT "_local_landing_pages_v_version_nearby_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v" ADD CONSTRAINT "_local_landing_pages_v_parent_id_local_landing_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v" ADD CONSTRAINT "_local_landing_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v" ADD CONSTRAINT "_local_landing_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_rels" ADD CONSTRAINT "_local_landing_pages_v_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_gdpr_anonymized_by_id_users_id_fk" FOREIGN KEY ("gdpr_anonymized_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_local_landing_pages_fk" FOREIGN KEY ("local_landing_pages_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_image_pair" ADD CONSTRAINT "about_page_image_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_image_pair" ADD CONSTRAINT "about_page_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_credits" ADD CONSTRAINT "about_page_credits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_image_pair" ADD CONSTRAINT "_about_page_v_version_image_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_image_pair" ADD CONSTRAINT "_about_page_v_version_image_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_credits" ADD CONSTRAINT "_about_page_v_version_credits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_referral_options" ADD CONSTRAINT "contact_page_referral_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_index" ADD CONSTRAINT "services_index_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_index_rels" ADD CONSTRAINT "services_index_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_index_rels" ADD CONSTRAINT "services_index_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnet_settings_placement" ADD CONSTRAINT "lead_magnet_settings_placement_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lead_magnet_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnet_settings" ADD CONSTRAINT "lead_magnet_settings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnet_settings" ADD CONSTRAINT "lead_magnet_settings_pdf_file_id_media_id_fk" FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_main_nav_children" ADD CONSTRAINT "navigation_main_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_nav" ADD CONSTRAINT "navigation_main_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal_links" ADD CONSTRAINT "navigation_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_main_nav_children" ADD CONSTRAINT "_navigation_v_version_main_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_main_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_main_nav" ADD CONSTRAINT "_navigation_v_version_main_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_footer_columns_links" ADD CONSTRAINT "_navigation_v_version_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_footer_columns" ADD CONSTRAINT "_navigation_v_version_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_legal_links" ADD CONSTRAINT "_navigation_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_slider_slides_order_idx" ON "pages_blocks_hero_slider_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_slider_slides_parent_id_idx" ON "pages_blocks_hero_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_slider_slides_image_idx" ON "pages_blocks_hero_slider_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_slider_order_idx" ON "pages_blocks_hero_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_slider_parent_id_idx" ON "pages_blocks_hero_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_slider_path_idx" ON "pages_blocks_hero_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_intro_block_order_idx" ON "pages_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_block_parent_id_idx" ON "pages_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_block_path_idx" ON "pages_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_intro_block_image_idx" ON "pages_blocks_intro_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_portfolio_teaser_order_idx" ON "pages_blocks_portfolio_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_teaser_parent_id_idx" ON "pages_blocks_portfolio_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_teaser_path_idx" ON "pages_blocks_portfolio_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_teaser_order_idx" ON "pages_blocks_services_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_teaser_parent_id_idx" ON "pages_blocks_services_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_teaser_path_idx" ON "pages_blocks_services_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_spread_order_idx" ON "pages_blocks_testimonial_spread" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_spread_parent_id_idx" ON "pages_blocks_testimonial_spread" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_spread_path_idx" ON "pages_blocks_testimonial_spread" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_spread_testimonial_idx" ON "pages_blocks_testimonial_spread" USING btree ("testimonial_id");
  CREATE INDEX "pages_blocks_testimonials_grid_order_idx" ON "pages_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_parent_id_idx" ON "pages_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_path_idx" ON "pages_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_preview_order_idx" ON "pages_blocks_about_preview" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_preview_parent_id_idx" ON "pages_blocks_about_preview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_preview_path_idx" ON "pages_blocks_about_preview" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_preview_image_idx" ON "pages_blocks_about_preview" USING btree ("image_id");
  CREATE INDEX "pages_blocks_blog_teaser_order_idx" ON "pages_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_teaser_parent_id_idx" ON "pages_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_teaser_path_idx" ON "pages_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_split_order_idx" ON "pages_blocks_contact_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_split_parent_id_idx" ON "pages_blocks_contact_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_split_path_idx" ON "pages_blocks_contact_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_split_image_idx" ON "pages_blocks_contact_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_pair_images_order_idx" ON "pages_blocks_image_pair_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_pair_images_parent_id_idx" ON "pages_blocks_image_pair_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_pair_images_image_idx" ON "pages_blocks_image_pair_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_pair_order_idx" ON "pages_blocks_image_pair" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_pair_parent_id_idx" ON "pages_blocks_image_pair" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_pair_path_idx" ON "pages_blocks_image_pair" USING btree ("_path");
  CREATE INDEX "pages_blocks_pull_quote_order_idx" ON "pages_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_pull_quote_parent_id_idx" ON "pages_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pull_quote_path_idx" ON "pages_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_background_image_idx" ON "pages_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_newsletter_form_order_idx" ON "pages_blocks_newsletter_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_form_parent_id_idx" ON "pages_blocks_newsletter_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_form_path_idx" ON "pages_blocks_newsletter_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_image_idx" ON "pages_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_portfolio_series_id_idx" ON "pages_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_blog_posts_id_idx" ON "pages_rels" USING btree ("blog_posts_id");
  CREATE INDEX "pages_rels_faq_entries_id_idx" ON "pages_rels" USING btree ("faq_entries_id");
  CREATE INDEX "_pages_v_blocks_hero_slider_slides_order_idx" ON "_pages_v_blocks_hero_slider_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_slider_slides_parent_id_idx" ON "_pages_v_blocks_hero_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_slider_slides_image_idx" ON "_pages_v_blocks_hero_slider_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_slider_order_idx" ON "_pages_v_blocks_hero_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_slider_parent_id_idx" ON "_pages_v_blocks_hero_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_slider_path_idx" ON "_pages_v_blocks_hero_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_block_order_idx" ON "_pages_v_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_block_parent_id_idx" ON "_pages_v_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_block_path_idx" ON "_pages_v_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_block_image_idx" ON "_pages_v_blocks_intro_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_portfolio_teaser_order_idx" ON "_pages_v_blocks_portfolio_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_teaser_parent_id_idx" ON "_pages_v_blocks_portfolio_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_teaser_path_idx" ON "_pages_v_blocks_portfolio_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_teaser_order_idx" ON "_pages_v_blocks_services_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_teaser_parent_id_idx" ON "_pages_v_blocks_services_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_teaser_path_idx" ON "_pages_v_blocks_services_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_spread_order_idx" ON "_pages_v_blocks_testimonial_spread" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_spread_parent_id_idx" ON "_pages_v_blocks_testimonial_spread" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_spread_path_idx" ON "_pages_v_blocks_testimonial_spread" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_spread_testimonial_idx" ON "_pages_v_blocks_testimonial_spread" USING btree ("testimonial_id");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_order_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_parent_id_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_grid_path_idx" ON "_pages_v_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_preview_order_idx" ON "_pages_v_blocks_about_preview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_preview_parent_id_idx" ON "_pages_v_blocks_about_preview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_preview_path_idx" ON "_pages_v_blocks_about_preview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_preview_image_idx" ON "_pages_v_blocks_about_preview" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_blog_teaser_order_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_teaser_parent_id_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_teaser_path_idx" ON "_pages_v_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_split_order_idx" ON "_pages_v_blocks_contact_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_split_parent_id_idx" ON "_pages_v_blocks_contact_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_split_path_idx" ON "_pages_v_blocks_contact_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_split_image_idx" ON "_pages_v_blocks_contact_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_pair_images_order_idx" ON "_pages_v_blocks_image_pair_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_pair_images_parent_id_idx" ON "_pages_v_blocks_image_pair_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_pair_images_image_idx" ON "_pages_v_blocks_image_pair_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_pair_order_idx" ON "_pages_v_blocks_image_pair" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_pair_parent_id_idx" ON "_pages_v_blocks_image_pair" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_pair_path_idx" ON "_pages_v_blocks_image_pair" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pull_quote_order_idx" ON "_pages_v_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pull_quote_parent_id_idx" ON "_pages_v_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pull_quote_path_idx" ON "_pages_v_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_background_image_idx" ON "_pages_v_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_newsletter_form_order_idx" ON "_pages_v_blocks_newsletter_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_form_parent_id_idx" ON "_pages_v_blocks_newsletter_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_form_path_idx" ON "_pages_v_blocks_newsletter_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_block_order_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_block_parent_id_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_path_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_image_idx" ON "_pages_v_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_spacer_order_idx" ON "_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_parent_id_idx" ON "_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_path_idx" ON "_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_portfolio_series_id_idx" ON "_pages_v_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_blog_posts_id_idx" ON "_pages_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX "_pages_v_rels_faq_entries_id_idx" ON "_pages_v_rels" USING btree ("faq_entries_id");
  CREATE INDEX "blog_posts_blocks_rich_text_block_order_idx" ON "blog_posts_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_rich_text_block_parent_id_idx" ON "blog_posts_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_rich_text_block_path_idx" ON "blog_posts_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_media_block_order_idx" ON "blog_posts_blocks_media_block" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_media_block_parent_id_idx" ON "blog_posts_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_media_block_path_idx" ON "blog_posts_blocks_media_block" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_media_block_image_idx" ON "blog_posts_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "blog_posts_blocks_pull_quote_order_idx" ON "blog_posts_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_pull_quote_parent_id_idx" ON "blog_posts_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_pull_quote_path_idx" ON "blog_posts_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_quote_order_idx" ON "blog_posts_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_quote_parent_id_idx" ON "blog_posts_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_quote_path_idx" ON "blog_posts_blocks_blog_quote" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_images_order_idx" ON "blog_posts_blocks_blog_image_grid_images" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_images_parent_id_idx" ON "blog_posts_blocks_blog_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_images_image_idx" ON "blog_posts_blocks_blog_image_grid_images" USING btree ("image_id");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_order_idx" ON "blog_posts_blocks_blog_image_grid" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_parent_id_idx" ON "blog_posts_blocks_blog_image_grid" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_image_grid_path_idx" ON "blog_posts_blocks_blog_image_grid" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_video_embed_order_idx" ON "blog_posts_blocks_blog_video_embed" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_video_embed_parent_id_idx" ON "blog_posts_blocks_blog_video_embed" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_video_embed_path_idx" ON "blog_posts_blocks_blog_video_embed" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_tip_callout_order_idx" ON "blog_posts_blocks_blog_tip_callout" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_tip_callout_parent_id_idx" ON "blog_posts_blocks_blog_tip_callout" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_tip_callout_path_idx" ON "blog_posts_blocks_blog_tip_callout" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_resource_link_order_idx" ON "blog_posts_blocks_blog_resource_link" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_resource_link_parent_id_idx" ON "blog_posts_blocks_blog_resource_link" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_resource_link_path_idx" ON "blog_posts_blocks_blog_resource_link" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_lead_magnet_inline_order_idx" ON "blog_posts_blocks_blog_lead_magnet_inline" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_blog_lead_magnet_inline_parent_id_idx" ON "blog_posts_blocks_blog_lead_magnet_inline" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_blog_lead_magnet_inline_path_idx" ON "blog_posts_blocks_blog_lead_magnet_inline" USING btree ("_path");
  CREATE INDEX "blog_posts_blocks_blog_lead_magnet_inline_image_idx" ON "blog_posts_blocks_blog_lead_magnet_inline" USING btree ("image_id");
  CREATE INDEX "blog_posts_blocks_blog_lead_magnet_inline_pdf_file_idx" ON "blog_posts_blocks_blog_lead_magnet_inline" USING btree ("pdf_file_id");
  CREATE INDEX "blog_posts_city_tags_order_idx" ON "blog_posts_city_tags" USING btree ("_order");
  CREATE INDEX "blog_posts_city_tags_parent_id_idx" ON "blog_posts_city_tags" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_niche_tags_order_idx" ON "blog_posts_niche_tags" USING btree ("_order");
  CREATE INDEX "blog_posts_niche_tags_parent_id_idx" ON "blog_posts_niche_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_cover_image_idx" ON "blog_posts" USING btree ("cover_image_id");
  CREATE INDEX "blog_posts_seo_seo_og_image_idx" ON "blog_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_blog_categories_id_idx" ON "blog_posts_rels" USING btree ("blog_categories_id");
  CREATE INDEX "blog_posts_rels_blog_posts_id_idx" ON "blog_posts_rels" USING btree ("blog_posts_id");
  CREATE INDEX "blog_posts_rels_portfolio_series_id_idx" ON "blog_posts_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "_blog_posts_v_blocks_rich_text_block_order_idx" ON "_blog_posts_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_rich_text_block_parent_id_idx" ON "_blog_posts_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_rich_text_block_path_idx" ON "_blog_posts_v_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_media_block_order_idx" ON "_blog_posts_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_media_block_parent_id_idx" ON "_blog_posts_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_media_block_path_idx" ON "_blog_posts_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_media_block_image_idx" ON "_blog_posts_v_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "_blog_posts_v_blocks_pull_quote_order_idx" ON "_blog_posts_v_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_pull_quote_parent_id_idx" ON "_blog_posts_v_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_pull_quote_path_idx" ON "_blog_posts_v_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_quote_order_idx" ON "_blog_posts_v_blocks_blog_quote" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_quote_parent_id_idx" ON "_blog_posts_v_blocks_blog_quote" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_quote_path_idx" ON "_blog_posts_v_blocks_blog_quote" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_images_order_idx" ON "_blog_posts_v_blocks_blog_image_grid_images" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_images_parent_id_idx" ON "_blog_posts_v_blocks_blog_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_images_image_idx" ON "_blog_posts_v_blocks_blog_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_order_idx" ON "_blog_posts_v_blocks_blog_image_grid" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_parent_id_idx" ON "_blog_posts_v_blocks_blog_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_image_grid_path_idx" ON "_blog_posts_v_blocks_blog_image_grid" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_video_embed_order_idx" ON "_blog_posts_v_blocks_blog_video_embed" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_video_embed_parent_id_idx" ON "_blog_posts_v_blocks_blog_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_video_embed_path_idx" ON "_blog_posts_v_blocks_blog_video_embed" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_tip_callout_order_idx" ON "_blog_posts_v_blocks_blog_tip_callout" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_tip_callout_parent_id_idx" ON "_blog_posts_v_blocks_blog_tip_callout" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_tip_callout_path_idx" ON "_blog_posts_v_blocks_blog_tip_callout" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_resource_link_order_idx" ON "_blog_posts_v_blocks_blog_resource_link" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_resource_link_parent_id_idx" ON "_blog_posts_v_blocks_blog_resource_link" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_resource_link_path_idx" ON "_blog_posts_v_blocks_blog_resource_link" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_lead_magnet_inline_order_idx" ON "_blog_posts_v_blocks_blog_lead_magnet_inline" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_blog_lead_magnet_inline_parent_id_idx" ON "_blog_posts_v_blocks_blog_lead_magnet_inline" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_lead_magnet_inline_path_idx" ON "_blog_posts_v_blocks_blog_lead_magnet_inline" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_blocks_blog_lead_magnet_inline_image_idx" ON "_blog_posts_v_blocks_blog_lead_magnet_inline" USING btree ("image_id");
  CREATE INDEX "_blog_posts_v_blocks_blog_lead_magnet_inline_pdf_file_idx" ON "_blog_posts_v_blocks_blog_lead_magnet_inline" USING btree ("pdf_file_id");
  CREATE INDEX "_blog_posts_v_version_city_tags_order_idx" ON "_blog_posts_v_version_city_tags" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_city_tags_parent_id_idx" ON "_blog_posts_v_version_city_tags" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_version_niche_tags_order_idx" ON "_blog_posts_v_version_niche_tags" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_niche_tags_parent_id_idx" ON "_blog_posts_v_version_niche_tags" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_cover_image_idx" ON "_blog_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_blog_posts_v_version_seo_version_seo_og_image_idx" ON "_blog_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX "_blog_posts_v_rels_blog_categories_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX "_blog_posts_v_rels_blog_posts_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX "_blog_posts_v_rels_portfolio_series_id_idx" ON "_blog_posts_v_rels" USING btree ("portfolio_series_id");
  CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "blog_categories" USING btree ("slug");
  CREATE INDEX "blog_categories_cover_image_idx" ON "blog_categories" USING btree ("cover_image_id");
  CREATE INDEX "blog_categories_seo_seo_og_image_idx" ON "blog_categories" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE INDEX "portfolio_categories_subcategories_order_idx" ON "portfolio_categories_subcategories" USING btree ("_order");
  CREATE INDEX "portfolio_categories_subcategories_parent_id_idx" ON "portfolio_categories_subcategories" USING btree ("_parent_id");
  CREATE INDEX "portfolio_categories_subcategories_cover_image_idx" ON "portfolio_categories_subcategories" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "portfolio_categories_slug_idx" ON "portfolio_categories" USING btree ("slug");
  CREATE INDEX "portfolio_categories_cover_image_idx" ON "portfolio_categories" USING btree ("cover_image_id");
  CREATE INDEX "portfolio_categories_seo_seo_og_image_idx" ON "portfolio_categories" USING btree ("seo_og_image_id");
  CREATE INDEX "portfolio_categories_updated_at_idx" ON "portfolio_categories" USING btree ("updated_at");
  CREATE INDEX "portfolio_categories_created_at_idx" ON "portfolio_categories" USING btree ("created_at");
  CREATE INDEX "portfolio_series_photos_order_idx" ON "portfolio_series_photos" USING btree ("_order");
  CREATE INDEX "portfolio_series_photos_parent_id_idx" ON "portfolio_series_photos" USING btree ("_parent_id");
  CREATE INDEX "portfolio_series_photos_image_idx" ON "portfolio_series_photos" USING btree ("image_id");
  CREATE INDEX "portfolio_series_city_tags_order_idx" ON "portfolio_series_city_tags" USING btree ("_order");
  CREATE INDEX "portfolio_series_city_tags_parent_id_idx" ON "portfolio_series_city_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "portfolio_series_slug_idx" ON "portfolio_series" USING btree ("slug");
  CREATE INDEX "portfolio_series_category_idx" ON "portfolio_series" USING btree ("category_id");
  CREATE INDEX "portfolio_series_cover_image_idx" ON "portfolio_series" USING btree ("cover_image_id");
  CREATE INDEX "portfolio_series_hero_image_idx" ON "portfolio_series" USING btree ("hero_image_id");
  CREATE INDEX "portfolio_series_seo_seo_og_image_idx" ON "portfolio_series" USING btree ("seo_og_image_id");
  CREATE INDEX "portfolio_series_updated_at_idx" ON "portfolio_series" USING btree ("updated_at");
  CREATE INDEX "portfolio_series_created_at_idx" ON "portfolio_series" USING btree ("created_at");
  CREATE INDEX "portfolio_series__status_idx" ON "portfolio_series" USING btree ("_status");
  CREATE INDEX "portfolio_series_rels_order_idx" ON "portfolio_series_rels" USING btree ("order");
  CREATE INDEX "portfolio_series_rels_parent_idx" ON "portfolio_series_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_series_rels_path_idx" ON "portfolio_series_rels" USING btree ("path");
  CREATE INDEX "portfolio_series_rels_tags_id_idx" ON "portfolio_series_rels" USING btree ("tags_id");
  CREATE INDEX "portfolio_series_rels_portfolio_series_id_idx" ON "portfolio_series_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "_portfolio_series_v_version_photos_order_idx" ON "_portfolio_series_v_version_photos" USING btree ("_order");
  CREATE INDEX "_portfolio_series_v_version_photos_parent_id_idx" ON "_portfolio_series_v_version_photos" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_series_v_version_photos_image_idx" ON "_portfolio_series_v_version_photos" USING btree ("image_id");
  CREATE INDEX "_portfolio_series_v_version_city_tags_order_idx" ON "_portfolio_series_v_version_city_tags" USING btree ("_order");
  CREATE INDEX "_portfolio_series_v_version_city_tags_parent_id_idx" ON "_portfolio_series_v_version_city_tags" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_series_v_parent_idx" ON "_portfolio_series_v" USING btree ("parent_id");
  CREATE INDEX "_portfolio_series_v_version_version_slug_idx" ON "_portfolio_series_v" USING btree ("version_slug");
  CREATE INDEX "_portfolio_series_v_version_version_category_idx" ON "_portfolio_series_v" USING btree ("version_category_id");
  CREATE INDEX "_portfolio_series_v_version_version_cover_image_idx" ON "_portfolio_series_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_portfolio_series_v_version_version_hero_image_idx" ON "_portfolio_series_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_portfolio_series_v_version_seo_version_seo_og_image_idx" ON "_portfolio_series_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_portfolio_series_v_version_version_updated_at_idx" ON "_portfolio_series_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolio_series_v_version_version_created_at_idx" ON "_portfolio_series_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolio_series_v_version_version__status_idx" ON "_portfolio_series_v" USING btree ("version__status");
  CREATE INDEX "_portfolio_series_v_created_at_idx" ON "_portfolio_series_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_series_v_updated_at_idx" ON "_portfolio_series_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_series_v_latest_idx" ON "_portfolio_series_v" USING btree ("latest");
  CREATE INDEX "_portfolio_series_v_rels_order_idx" ON "_portfolio_series_v_rels" USING btree ("order");
  CREATE INDEX "_portfolio_series_v_rels_parent_idx" ON "_portfolio_series_v_rels" USING btree ("parent_id");
  CREATE INDEX "_portfolio_series_v_rels_path_idx" ON "_portfolio_series_v_rels" USING btree ("path");
  CREATE INDEX "_portfolio_series_v_rels_tags_id_idx" ON "_portfolio_series_v_rels" USING btree ("tags_id");
  CREATE INDEX "_portfolio_series_v_rels_portfolio_series_id_idx" ON "_portfolio_series_v_rels" USING btree ("portfolio_series_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "services_packages_features_order_idx" ON "services_packages_features" USING btree ("_order");
  CREATE INDEX "services_packages_features_parent_id_idx" ON "services_packages_features" USING btree ("_parent_id");
  CREATE INDEX "services_packages_order_idx" ON "services_packages" USING btree ("_order");
  CREATE INDEX "services_packages_parent_id_idx" ON "services_packages" USING btree ("_parent_id");
  CREATE INDEX "services_packages_image_idx" ON "services_packages" USING btree ("image_id");
  CREATE INDEX "services_process_steps_order_idx" ON "services_process_steps" USING btree ("_order");
  CREATE INDEX "services_process_steps_parent_id_idx" ON "services_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_cover_image_idx" ON "services" USING btree ("cover_image_id");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_portfolio_series_id_idx" ON "services_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_faq_entries_id_idx" ON "services_rels" USING btree ("faq_entries_id");
  CREATE INDEX "faq_entries_related_niche_idx" ON "faq_entries" USING btree ("related_niche_id");
  CREATE INDEX "faq_entries_updated_at_idx" ON "faq_entries" USING btree ("updated_at");
  CREATE INDEX "faq_entries_created_at_idx" ON "faq_entries" USING btree ("created_at");
  CREATE INDEX "testimonials_client_photo_idx" ON "testimonials" USING btree ("client_photo_id");
  CREATE INDEX "testimonials_session_type_idx" ON "testimonials" USING btree ("session_type_id");
  CREATE INDEX "testimonials_related_series_idx" ON "testimonials" USING btree ("related_series_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_slides_order_idx" ON "local_landing_pages_blocks_hero_slider_slides" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_slides_parent_id_idx" ON "local_landing_pages_blocks_hero_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_slides_image_idx" ON "local_landing_pages_blocks_hero_slider_slides" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_order_idx" ON "local_landing_pages_blocks_hero_slider" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_parent_id_idx" ON "local_landing_pages_blocks_hero_slider" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_hero_slider_path_idx" ON "local_landing_pages_blocks_hero_slider" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_intro_block_order_idx" ON "local_landing_pages_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_intro_block_parent_id_idx" ON "local_landing_pages_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_intro_block_path_idx" ON "local_landing_pages_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_intro_block_image_idx" ON "local_landing_pages_blocks_intro_block" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_portfolio_teaser_order_idx" ON "local_landing_pages_blocks_portfolio_teaser" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_portfolio_teaser_parent_id_idx" ON "local_landing_pages_blocks_portfolio_teaser" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_portfolio_teaser_path_idx" ON "local_landing_pages_blocks_portfolio_teaser" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_services_teaser_order_idx" ON "local_landing_pages_blocks_services_teaser" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_services_teaser_parent_id_idx" ON "local_landing_pages_blocks_services_teaser" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_services_teaser_path_idx" ON "local_landing_pages_blocks_services_teaser" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_testimonial_spread_order_idx" ON "local_landing_pages_blocks_testimonial_spread" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_testimonial_spread_parent_id_idx" ON "local_landing_pages_blocks_testimonial_spread" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_testimonial_spread_path_idx" ON "local_landing_pages_blocks_testimonial_spread" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_testimonial_spread_testimonia_idx" ON "local_landing_pages_blocks_testimonial_spread" USING btree ("testimonial_id");
  CREATE INDEX "local_landing_pages_blocks_testimonials_grid_order_idx" ON "local_landing_pages_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_testimonials_grid_parent_id_idx" ON "local_landing_pages_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_testimonials_grid_path_idx" ON "local_landing_pages_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_about_preview_order_idx" ON "local_landing_pages_blocks_about_preview" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_about_preview_parent_id_idx" ON "local_landing_pages_blocks_about_preview" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_about_preview_path_idx" ON "local_landing_pages_blocks_about_preview" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_about_preview_image_idx" ON "local_landing_pages_blocks_about_preview" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_blog_teaser_order_idx" ON "local_landing_pages_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_blog_teaser_parent_id_idx" ON "local_landing_pages_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_blog_teaser_path_idx" ON "local_landing_pages_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_contact_split_order_idx" ON "local_landing_pages_blocks_contact_split" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_contact_split_parent_id_idx" ON "local_landing_pages_blocks_contact_split" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_contact_split_path_idx" ON "local_landing_pages_blocks_contact_split" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_contact_split_image_idx" ON "local_landing_pages_blocks_contact_split" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_image_pair_images_order_idx" ON "local_landing_pages_blocks_image_pair_images" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_image_pair_images_parent_id_idx" ON "local_landing_pages_blocks_image_pair_images" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_image_pair_images_image_idx" ON "local_landing_pages_blocks_image_pair_images" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_image_pair_order_idx" ON "local_landing_pages_blocks_image_pair" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_image_pair_parent_id_idx" ON "local_landing_pages_blocks_image_pair" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_image_pair_path_idx" ON "local_landing_pages_blocks_image_pair" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_pull_quote_order_idx" ON "local_landing_pages_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_pull_quote_parent_id_idx" ON "local_landing_pages_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_pull_quote_path_idx" ON "local_landing_pages_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_process_steps_steps_order_idx" ON "local_landing_pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_process_steps_steps_parent_id_idx" ON "local_landing_pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_process_steps_order_idx" ON "local_landing_pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_process_steps_parent_id_idx" ON "local_landing_pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_process_steps_path_idx" ON "local_landing_pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_cta_banner_order_idx" ON "local_landing_pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_cta_banner_parent_id_idx" ON "local_landing_pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_cta_banner_path_idx" ON "local_landing_pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_cta_banner_background_image_idx" ON "local_landing_pages_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "local_landing_pages_blocks_newsletter_form_order_idx" ON "local_landing_pages_blocks_newsletter_form" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_newsletter_form_parent_id_idx" ON "local_landing_pages_blocks_newsletter_form" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_newsletter_form_path_idx" ON "local_landing_pages_blocks_newsletter_form" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_faq_accordion_order_idx" ON "local_landing_pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_faq_accordion_parent_id_idx" ON "local_landing_pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_faq_accordion_path_idx" ON "local_landing_pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_rich_text_block_order_idx" ON "local_landing_pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_rich_text_block_parent_id_idx" ON "local_landing_pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_rich_text_block_path_idx" ON "local_landing_pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_media_block_order_idx" ON "local_landing_pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_media_block_parent_id_idx" ON "local_landing_pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_media_block_path_idx" ON "local_landing_pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_media_block_image_idx" ON "local_landing_pages_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_spacer_order_idx" ON "local_landing_pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_spacer_parent_id_idx" ON "local_landing_pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_spacer_path_idx" ON "local_landing_pages_blocks_spacer" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_city_highlight_order_idx" ON "local_landing_pages_blocks_city_highlight" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_city_highlight_parent_id_idx" ON "local_landing_pages_blocks_city_highlight" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_city_highlight_path_idx" ON "local_landing_pages_blocks_city_highlight" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_city_highlight_image_idx" ON "local_landing_pages_blocks_city_highlight" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_service_for_city_order_idx" ON "local_landing_pages_blocks_service_for_city" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_service_for_city_parent_id_idx" ON "local_landing_pages_blocks_service_for_city" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_service_for_city_path_idx" ON "local_landing_pages_blocks_service_for_city" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_service_for_city_service_idx" ON "local_landing_pages_blocks_service_for_city" USING btree ("service_id");
  CREATE INDEX "local_landing_pages_blocks_local_locations_list_locations_order_idx" ON "local_landing_pages_blocks_local_locations_list_locations" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_local_locations_list_locations_parent_id_idx" ON "local_landing_pages_blocks_local_locations_list_locations" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_local_locations_list_order_idx" ON "local_landing_pages_blocks_local_locations_list" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_local_locations_list_parent_id_idx" ON "local_landing_pages_blocks_local_locations_list" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_local_locations_list_path_idx" ON "local_landing_pages_blocks_local_locations_list" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_areas_order_idx" ON "local_landing_pages_blocks_nearby_areas_grid_areas" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_areas_parent_id_idx" ON "local_landing_pages_blocks_nearby_areas_grid_areas" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_areas_image_idx" ON "local_landing_pages_blocks_nearby_areas_grid_areas" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_order_idx" ON "local_landing_pages_blocks_nearby_areas_grid" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_parent_id_idx" ON "local_landing_pages_blocks_nearby_areas_grid" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_nearby_areas_grid_path_idx" ON "local_landing_pages_blocks_nearby_areas_grid" USING btree ("_path");
  CREATE INDEX "local_landing_pages_popular_locations_order_idx" ON "local_landing_pages_popular_locations" USING btree ("_order");
  CREATE INDEX "local_landing_pages_popular_locations_parent_id_idx" ON "local_landing_pages_popular_locations" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_nearby_areas_order_idx" ON "local_landing_pages_nearby_areas" USING btree ("_order");
  CREATE INDEX "local_landing_pages_nearby_areas_parent_id_idx" ON "local_landing_pages_nearby_areas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "local_landing_pages_slug_idx" ON "local_landing_pages" USING btree ("slug");
  CREATE INDEX "local_landing_pages_hero_image_idx" ON "local_landing_pages" USING btree ("hero_image_id");
  CREATE INDEX "local_landing_pages_seo_seo_og_image_idx" ON "local_landing_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "local_landing_pages_updated_at_idx" ON "local_landing_pages" USING btree ("updated_at");
  CREATE INDEX "local_landing_pages_created_at_idx" ON "local_landing_pages" USING btree ("created_at");
  CREATE INDEX "local_landing_pages__status_idx" ON "local_landing_pages" USING btree ("_status");
  CREATE INDEX "local_landing_pages_rels_order_idx" ON "local_landing_pages_rels" USING btree ("order");
  CREATE INDEX "local_landing_pages_rels_parent_idx" ON "local_landing_pages_rels" USING btree ("parent_id");
  CREATE INDEX "local_landing_pages_rels_path_idx" ON "local_landing_pages_rels" USING btree ("path");
  CREATE INDEX "local_landing_pages_rels_portfolio_series_id_idx" ON "local_landing_pages_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "local_landing_pages_rels_services_id_idx" ON "local_landing_pages_rels" USING btree ("services_id");
  CREATE INDEX "local_landing_pages_rels_testimonials_id_idx" ON "local_landing_pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "local_landing_pages_rels_blog_posts_id_idx" ON "local_landing_pages_rels" USING btree ("blog_posts_id");
  CREATE INDEX "local_landing_pages_rels_faq_entries_id_idx" ON "local_landing_pages_rels" USING btree ("faq_entries_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_slides_order_idx" ON "_local_landing_pages_v_blocks_hero_slider_slides" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_slides_parent_id_idx" ON "_local_landing_pages_v_blocks_hero_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_slides_image_idx" ON "_local_landing_pages_v_blocks_hero_slider_slides" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_order_idx" ON "_local_landing_pages_v_blocks_hero_slider" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_parent_id_idx" ON "_local_landing_pages_v_blocks_hero_slider" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_slider_path_idx" ON "_local_landing_pages_v_blocks_hero_slider" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_intro_block_order_idx" ON "_local_landing_pages_v_blocks_intro_block" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_intro_block_parent_id_idx" ON "_local_landing_pages_v_blocks_intro_block" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_intro_block_path_idx" ON "_local_landing_pages_v_blocks_intro_block" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_intro_block_image_idx" ON "_local_landing_pages_v_blocks_intro_block" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_portfolio_teaser_order_idx" ON "_local_landing_pages_v_blocks_portfolio_teaser" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_portfolio_teaser_parent_id_idx" ON "_local_landing_pages_v_blocks_portfolio_teaser" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_portfolio_teaser_path_idx" ON "_local_landing_pages_v_blocks_portfolio_teaser" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_services_teaser_order_idx" ON "_local_landing_pages_v_blocks_services_teaser" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_services_teaser_parent_id_idx" ON "_local_landing_pages_v_blocks_services_teaser" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_services_teaser_path_idx" ON "_local_landing_pages_v_blocks_services_teaser" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonial_spread_order_idx" ON "_local_landing_pages_v_blocks_testimonial_spread" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonial_spread_parent_id_idx" ON "_local_landing_pages_v_blocks_testimonial_spread" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonial_spread_path_idx" ON "_local_landing_pages_v_blocks_testimonial_spread" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonial_spread_testimo_idx" ON "_local_landing_pages_v_blocks_testimonial_spread" USING btree ("testimonial_id");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonials_grid_order_idx" ON "_local_landing_pages_v_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonials_grid_parent_id_idx" ON "_local_landing_pages_v_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_testimonials_grid_path_idx" ON "_local_landing_pages_v_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_about_preview_order_idx" ON "_local_landing_pages_v_blocks_about_preview" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_about_preview_parent_id_idx" ON "_local_landing_pages_v_blocks_about_preview" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_about_preview_path_idx" ON "_local_landing_pages_v_blocks_about_preview" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_about_preview_image_idx" ON "_local_landing_pages_v_blocks_about_preview" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_blog_teaser_order_idx" ON "_local_landing_pages_v_blocks_blog_teaser" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_blog_teaser_parent_id_idx" ON "_local_landing_pages_v_blocks_blog_teaser" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_blog_teaser_path_idx" ON "_local_landing_pages_v_blocks_blog_teaser" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_contact_split_order_idx" ON "_local_landing_pages_v_blocks_contact_split" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_contact_split_parent_id_idx" ON "_local_landing_pages_v_blocks_contact_split" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_contact_split_path_idx" ON "_local_landing_pages_v_blocks_contact_split" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_contact_split_image_idx" ON "_local_landing_pages_v_blocks_contact_split" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_images_order_idx" ON "_local_landing_pages_v_blocks_image_pair_images" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_images_parent_id_idx" ON "_local_landing_pages_v_blocks_image_pair_images" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_images_image_idx" ON "_local_landing_pages_v_blocks_image_pair_images" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_order_idx" ON "_local_landing_pages_v_blocks_image_pair" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_parent_id_idx" ON "_local_landing_pages_v_blocks_image_pair" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_image_pair_path_idx" ON "_local_landing_pages_v_blocks_image_pair" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_pull_quote_order_idx" ON "_local_landing_pages_v_blocks_pull_quote" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_pull_quote_parent_id_idx" ON "_local_landing_pages_v_blocks_pull_quote" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_pull_quote_path_idx" ON "_local_landing_pages_v_blocks_pull_quote" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_process_steps_steps_order_idx" ON "_local_landing_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_local_landing_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_process_steps_order_idx" ON "_local_landing_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_process_steps_parent_id_idx" ON "_local_landing_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_process_steps_path_idx" ON "_local_landing_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_cta_banner_order_idx" ON "_local_landing_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_cta_banner_parent_id_idx" ON "_local_landing_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_cta_banner_path_idx" ON "_local_landing_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_cta_banner_background_imag_idx" ON "_local_landing_pages_v_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_newsletter_form_order_idx" ON "_local_landing_pages_v_blocks_newsletter_form" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_newsletter_form_parent_id_idx" ON "_local_landing_pages_v_blocks_newsletter_form" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_newsletter_form_path_idx" ON "_local_landing_pages_v_blocks_newsletter_form" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_faq_accordion_order_idx" ON "_local_landing_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_faq_accordion_parent_id_idx" ON "_local_landing_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_faq_accordion_path_idx" ON "_local_landing_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_rich_text_block_order_idx" ON "_local_landing_pages_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_rich_text_block_parent_id_idx" ON "_local_landing_pages_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_rich_text_block_path_idx" ON "_local_landing_pages_v_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_media_block_order_idx" ON "_local_landing_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_media_block_parent_id_idx" ON "_local_landing_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_media_block_path_idx" ON "_local_landing_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_media_block_image_idx" ON "_local_landing_pages_v_blocks_media_block" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_spacer_order_idx" ON "_local_landing_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_spacer_parent_id_idx" ON "_local_landing_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_spacer_path_idx" ON "_local_landing_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_city_highlight_order_idx" ON "_local_landing_pages_v_blocks_city_highlight" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_city_highlight_parent_id_idx" ON "_local_landing_pages_v_blocks_city_highlight" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_city_highlight_path_idx" ON "_local_landing_pages_v_blocks_city_highlight" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_city_highlight_image_idx" ON "_local_landing_pages_v_blocks_city_highlight" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_service_for_city_order_idx" ON "_local_landing_pages_v_blocks_service_for_city" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_service_for_city_parent_id_idx" ON "_local_landing_pages_v_blocks_service_for_city" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_service_for_city_path_idx" ON "_local_landing_pages_v_blocks_service_for_city" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_service_for_city_service_idx" ON "_local_landing_pages_v_blocks_service_for_city" USING btree ("service_id");
  CREATE INDEX "_local_landing_pages_v_blocks_local_locations_list_locations_order_idx" ON "_local_landing_pages_v_blocks_local_locations_list_locations" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_local_locations_list_locations_parent_id_idx" ON "_local_landing_pages_v_blocks_local_locations_list_locations" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_local_locations_list_order_idx" ON "_local_landing_pages_v_blocks_local_locations_list" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_local_locations_list_parent_id_idx" ON "_local_landing_pages_v_blocks_local_locations_list" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_local_locations_list_path_idx" ON "_local_landing_pages_v_blocks_local_locations_list" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_areas_order_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid_areas" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_areas_parent_id_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid_areas" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_areas_im_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid_areas" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_order_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_parent_id_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_nearby_areas_grid_path_idx" ON "_local_landing_pages_v_blocks_nearby_areas_grid" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_version_popular_locations_order_idx" ON "_local_landing_pages_v_version_popular_locations" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_version_popular_locations_parent_id_idx" ON "_local_landing_pages_v_version_popular_locations" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_version_nearby_areas_order_idx" ON "_local_landing_pages_v_version_nearby_areas" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_version_nearby_areas_parent_id_idx" ON "_local_landing_pages_v_version_nearby_areas" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_parent_idx" ON "_local_landing_pages_v" USING btree ("parent_id");
  CREATE INDEX "_local_landing_pages_v_version_version_slug_idx" ON "_local_landing_pages_v" USING btree ("version_slug");
  CREATE INDEX "_local_landing_pages_v_version_version_hero_image_idx" ON "_local_landing_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_local_landing_pages_v_version_seo_version_seo_og_image_idx" ON "_local_landing_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_local_landing_pages_v_version_version_updated_at_idx" ON "_local_landing_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_local_landing_pages_v_version_version_created_at_idx" ON "_local_landing_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_local_landing_pages_v_version_version__status_idx" ON "_local_landing_pages_v" USING btree ("version__status");
  CREATE INDEX "_local_landing_pages_v_created_at_idx" ON "_local_landing_pages_v" USING btree ("created_at");
  CREATE INDEX "_local_landing_pages_v_updated_at_idx" ON "_local_landing_pages_v" USING btree ("updated_at");
  CREATE INDEX "_local_landing_pages_v_latest_idx" ON "_local_landing_pages_v" USING btree ("latest");
  CREATE INDEX "_local_landing_pages_v_rels_order_idx" ON "_local_landing_pages_v_rels" USING btree ("order");
  CREATE INDEX "_local_landing_pages_v_rels_parent_idx" ON "_local_landing_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_local_landing_pages_v_rels_path_idx" ON "_local_landing_pages_v_rels" USING btree ("path");
  CREATE INDEX "_local_landing_pages_v_rels_portfolio_series_id_idx" ON "_local_landing_pages_v_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "_local_landing_pages_v_rels_services_id_idx" ON "_local_landing_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_local_landing_pages_v_rels_testimonials_id_idx" ON "_local_landing_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_local_landing_pages_v_rels_blog_posts_id_idx" ON "_local_landing_pages_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX "_local_landing_pages_v_rels_faq_entries_id_idx" ON "_local_landing_pages_v_rels" USING btree ("faq_entries_id");
  CREATE INDEX "leads_gdpr_anonymized_by_idx" ON "leads" USING btree ("gdpr_anonymized_by_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_series_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_series_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_faq_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_entries_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_local_landing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("local_landing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "about_page_image_pair_order_idx" ON "about_page_image_pair" USING btree ("_order");
  CREATE INDEX "about_page_image_pair_parent_id_idx" ON "about_page_image_pair" USING btree ("_parent_id");
  CREATE INDEX "about_page_image_pair_image_idx" ON "about_page_image_pair" USING btree ("image_id");
  CREATE INDEX "about_page_credits_order_idx" ON "about_page_credits" USING btree ("_order");
  CREATE INDEX "about_page_credits_parent_id_idx" ON "about_page_credits" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_image_pair_order_idx" ON "_about_page_v_version_image_pair" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_image_pair_parent_id_idx" ON "_about_page_v_version_image_pair" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_image_pair_image_idx" ON "_about_page_v_version_image_pair" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_credits_order_idx" ON "_about_page_v_version_credits" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_credits_parent_id_idx" ON "_about_page_v_version_credits" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_seo_version_seo_og_image_idx" ON "_about_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "contact_page_referral_options_order_idx" ON "contact_page_referral_options" USING btree ("_order");
  CREATE INDEX "contact_page_referral_options_parent_id_idx" ON "contact_page_referral_options" USING btree ("_parent_id");
  CREATE INDEX "contact_page_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "faq_page_hero_image_idx" ON "faq_page" USING btree ("hero_image_id");
  CREATE INDEX "faq_page_seo_seo_og_image_idx" ON "faq_page" USING btree ("seo_og_image_id");
  CREATE INDEX "services_index_seo_seo_og_image_idx" ON "services_index" USING btree ("seo_og_image_id");
  CREATE INDEX "services_index_rels_order_idx" ON "services_index_rels" USING btree ("order");
  CREATE INDEX "services_index_rels_parent_idx" ON "services_index_rels" USING btree ("parent_id");
  CREATE INDEX "services_index_rels_path_idx" ON "services_index_rels" USING btree ("path");
  CREATE INDEX "services_index_rels_services_id_idx" ON "services_index_rels" USING btree ("services_id");
  CREATE INDEX "lead_magnet_settings_placement_order_idx" ON "lead_magnet_settings_placement" USING btree ("order");
  CREATE INDEX "lead_magnet_settings_placement_parent_idx" ON "lead_magnet_settings_placement" USING btree ("parent_id");
  CREATE INDEX "lead_magnet_settings_image_idx" ON "lead_magnet_settings" USING btree ("image_id");
  CREATE INDEX "lead_magnet_settings_pdf_file_idx" ON "lead_magnet_settings" USING btree ("pdf_file_id");
  CREATE INDEX "navigation_main_nav_children_order_idx" ON "navigation_main_nav_children" USING btree ("_order");
  CREATE INDEX "navigation_main_nav_children_parent_id_idx" ON "navigation_main_nav_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_main_nav_order_idx" ON "navigation_main_nav" USING btree ("_order");
  CREATE INDEX "navigation_main_nav_parent_id_idx" ON "navigation_main_nav" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "navigation_legal_links_order_idx" ON "navigation_legal_links" USING btree ("_order");
  CREATE INDEX "navigation_legal_links_parent_id_idx" ON "navigation_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_main_nav_children_order_idx" ON "_navigation_v_version_main_nav_children" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_main_nav_children_parent_id_idx" ON "_navigation_v_version_main_nav_children" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_main_nav_order_idx" ON "_navigation_v_version_main_nav" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_main_nav_parent_id_idx" ON "_navigation_v_version_main_nav" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_footer_columns_links_order_idx" ON "_navigation_v_version_footer_columns_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_footer_columns_links_parent_id_idx" ON "_navigation_v_version_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_footer_columns_order_idx" ON "_navigation_v_version_footer_columns" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_footer_columns_parent_id_idx" ON "_navigation_v_version_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_legal_links_order_idx" ON "_navigation_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_legal_links_parent_id_idx" ON "_navigation_v_version_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_slider_slides" CASCADE;
  DROP TABLE "pages_blocks_hero_slider" CASCADE;
  DROP TABLE "pages_blocks_intro_block" CASCADE;
  DROP TABLE "pages_blocks_portfolio_teaser" CASCADE;
  DROP TABLE "pages_blocks_services_teaser" CASCADE;
  DROP TABLE "pages_blocks_testimonial_spread" CASCADE;
  DROP TABLE "pages_blocks_testimonials_grid" CASCADE;
  DROP TABLE "pages_blocks_about_preview" CASCADE;
  DROP TABLE "pages_blocks_blog_teaser" CASCADE;
  DROP TABLE "pages_blocks_contact_split" CASCADE;
  DROP TABLE "pages_blocks_image_pair_images" CASCADE;
  DROP TABLE "pages_blocks_image_pair" CASCADE;
  DROP TABLE "pages_blocks_pull_quote" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_newsletter_form" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_slider_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_block" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_services_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_spread" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_about_preview" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_split" CASCADE;
  DROP TABLE "_pages_v_blocks_image_pair_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_pair" CASCADE;
  DROP TABLE "_pages_v_blocks_pull_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_form" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "blog_posts_blocks_rich_text_block" CASCADE;
  DROP TABLE "blog_posts_blocks_media_block" CASCADE;
  DROP TABLE "blog_posts_blocks_pull_quote" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_quote" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_image_grid_images" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_image_grid" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_video_embed" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_tip_callout" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_resource_link" CASCADE;
  DROP TABLE "blog_posts_blocks_blog_lead_magnet_inline" CASCADE;
  DROP TABLE "blog_posts_city_tags" CASCADE;
  DROP TABLE "blog_posts_niche_tags" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_media_block" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_pull_quote" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_quote" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_image_grid_images" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_image_grid" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_video_embed" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_tip_callout" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_resource_link" CASCADE;
  DROP TABLE "_blog_posts_v_blocks_blog_lead_magnet_inline" CASCADE;
  DROP TABLE "_blog_posts_v_version_city_tags" CASCADE;
  DROP TABLE "_blog_posts_v_version_niche_tags" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_rels" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "portfolio_categories_subcategories" CASCADE;
  DROP TABLE "portfolio_categories" CASCADE;
  DROP TABLE "portfolio_series_photos" CASCADE;
  DROP TABLE "portfolio_series_city_tags" CASCADE;
  DROP TABLE "portfolio_series" CASCADE;
  DROP TABLE "portfolio_series_rels" CASCADE;
  DROP TABLE "_portfolio_series_v_version_photos" CASCADE;
  DROP TABLE "_portfolio_series_v_version_city_tags" CASCADE;
  DROP TABLE "_portfolio_series_v" CASCADE;
  DROP TABLE "_portfolio_series_v_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "services_packages_features" CASCADE;
  DROP TABLE "services_packages" CASCADE;
  DROP TABLE "services_process_steps" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "faq_entries" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "local_landing_pages_blocks_hero_slider_slides" CASCADE;
  DROP TABLE "local_landing_pages_blocks_hero_slider" CASCADE;
  DROP TABLE "local_landing_pages_blocks_intro_block" CASCADE;
  DROP TABLE "local_landing_pages_blocks_portfolio_teaser" CASCADE;
  DROP TABLE "local_landing_pages_blocks_services_teaser" CASCADE;
  DROP TABLE "local_landing_pages_blocks_testimonial_spread" CASCADE;
  DROP TABLE "local_landing_pages_blocks_testimonials_grid" CASCADE;
  DROP TABLE "local_landing_pages_blocks_about_preview" CASCADE;
  DROP TABLE "local_landing_pages_blocks_blog_teaser" CASCADE;
  DROP TABLE "local_landing_pages_blocks_contact_split" CASCADE;
  DROP TABLE "local_landing_pages_blocks_image_pair_images" CASCADE;
  DROP TABLE "local_landing_pages_blocks_image_pair" CASCADE;
  DROP TABLE "local_landing_pages_blocks_pull_quote" CASCADE;
  DROP TABLE "local_landing_pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "local_landing_pages_blocks_process_steps" CASCADE;
  DROP TABLE "local_landing_pages_blocks_cta_banner" CASCADE;
  DROP TABLE "local_landing_pages_blocks_newsletter_form" CASCADE;
  DROP TABLE "local_landing_pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "local_landing_pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "local_landing_pages_blocks_media_block" CASCADE;
  DROP TABLE "local_landing_pages_blocks_spacer" CASCADE;
  DROP TABLE "local_landing_pages_blocks_city_highlight" CASCADE;
  DROP TABLE "local_landing_pages_blocks_service_for_city" CASCADE;
  DROP TABLE "local_landing_pages_blocks_local_locations_list_locations" CASCADE;
  DROP TABLE "local_landing_pages_blocks_local_locations_list" CASCADE;
  DROP TABLE "local_landing_pages_blocks_nearby_areas_grid_areas" CASCADE;
  DROP TABLE "local_landing_pages_blocks_nearby_areas_grid" CASCADE;
  DROP TABLE "local_landing_pages_popular_locations" CASCADE;
  DROP TABLE "local_landing_pages_nearby_areas" CASCADE;
  DROP TABLE "local_landing_pages" CASCADE;
  DROP TABLE "local_landing_pages_rels" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_hero_slider_slides" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_hero_slider" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_intro_block" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_portfolio_teaser" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_services_teaser" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_testimonial_spread" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_testimonials_grid" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_about_preview" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_blog_teaser" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_contact_split" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_image_pair_images" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_image_pair" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_pull_quote" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_newsletter_form" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_city_highlight" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_service_for_city" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_local_locations_list_locations" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_local_locations_list" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_nearby_areas_grid_areas" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_nearby_areas_grid" CASCADE;
  DROP TABLE "_local_landing_pages_v_version_popular_locations" CASCADE;
  DROP TABLE "_local_landing_pages_v_version_nearby_areas" CASCADE;
  DROP TABLE "_local_landing_pages_v" CASCADE;
  DROP TABLE "_local_landing_pages_v_rels" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "about_page_image_pair" CASCADE;
  DROP TABLE "about_page_credits" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_image_pair" CASCADE;
  DROP TABLE "_about_page_v_version_credits" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page_referral_options" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TABLE "services_index" CASCADE;
  DROP TABLE "services_index_rels" CASCADE;
  DROP TABLE "lead_magnet_settings_placement" CASCADE;
  DROP TABLE "lead_magnet_settings" CASCADE;
  DROP TABLE "navigation_main_nav_children" CASCADE;
  DROP TABLE "navigation_main_nav" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation_legal_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "_navigation_v_version_main_nav_children" CASCADE;
  DROP TABLE "_navigation_v_version_main_nav" CASCADE;
  DROP TABLE "_navigation_v_version_footer_columns_links" CASCADE;
  DROP TABLE "_navigation_v_version_footer_columns" CASCADE;
  DROP TABLE "_navigation_v_version_legal_links" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_intro_block_image_position";
  DROP TYPE "public"."enum_pages_blocks_services_teaser_display_mode";
  DROP TYPE "public"."enum_pages_blocks_testimonials_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_contact_split_form_variant";
  DROP TYPE "public"."enum_pages_blocks_pull_quote_style";
  DROP TYPE "public"."enum_pages_blocks_media_block_width";
  DROP TYPE "public"."enum_pages_blocks_spacer_size";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_intro_block_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_services_teaser_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_contact_split_form_variant";
  DROP TYPE "public"."enum__pages_v_blocks_pull_quote_style";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_width";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_size";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_blog_posts_blocks_media_block_width";
  DROP TYPE "public"."enum_blog_posts_blocks_pull_quote_style";
  DROP TYPE "public"."enum_blog_posts_niche_tags_niche";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_blocks_media_block_width";
  DROP TYPE "public"."enum__blog_posts_v_blocks_pull_quote_style";
  DROP TYPE "public"."enum__blog_posts_v_version_niche_tags_niche";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum_portfolio_series_status";
  DROP TYPE "public"."enum__portfolio_series_v_version_status";
  DROP TYPE "public"."enum_tags_type";
  DROP TYPE "public"."enum_services_packages_tier";
  DROP TYPE "public"."enum_services_niche_key";
  DROP TYPE "public"."enum_faq_entries_category";
  DROP TYPE "public"."enum_local_landing_pages_blocks_intro_block_image_position";
  DROP TYPE "public"."enum_local_landing_pages_blocks_services_teaser_display_mode";
  DROP TYPE "public"."enum_local_landing_pages_blocks_testimonials_grid_columns";
  DROP TYPE "public"."enum_local_landing_pages_blocks_contact_split_form_variant";
  DROP TYPE "public"."enum_local_landing_pages_blocks_pull_quote_style";
  DROP TYPE "public"."enum_local_landing_pages_blocks_media_block_width";
  DROP TYPE "public"."enum_local_landing_pages_blocks_spacer_size";
  DROP TYPE "public"."enum_local_landing_pages_status";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_intro_block_image_position";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_services_teaser_display_mode";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_testimonials_grid_columns";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_contact_split_form_variant";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_pull_quote_style";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_media_block_width";
  DROP TYPE "public"."enum__local_landing_pages_v_blocks_spacer_size";
  DROP TYPE "public"."enum__local_landing_pages_v_version_status";
  DROP TYPE "public"."enum_leads_budget";
  DROP TYPE "public"."enum_leads_referral_source";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_leads_crm_sync_status";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_lead_magnet_settings_placement";
  DROP TYPE "public"."enum_lead_magnet_settings_trigger";
  DROP TYPE "public"."enum_site_settings_socials_platform";`)
}
