<?php
/**
 * Plugin Name: Outil de schéma fiscal
 * Plugin URI:  https://fiscaliteinternationale.fr/
 * Description: Intègre l’outil autonome de schémas de structure juridiques et fiscaux dans une page WordPress.
 * Version:     1.2.6
 * Author:      Lyès Kaci
 * Author URI:  https://fiscaliteinternationale.fr/
 * License:     All rights reserved
 * Text Domain: schema-fiscal-outil
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

defined( 'ABSPATH' ) || exit;

final class FI_Schema_Fiscal_Outil {
	private const VERSION = '1.2.6';
	private const SHORTCODES = array( 'outil_schema_fiscal', 'schema_fiscal' );
	private static bool $styles_added = false;

	public static function init(): void {
		foreach ( self::SHORTCODES as $shortcode ) {
			add_shortcode( $shortcode, array( __CLASS__, 'render_shortcode' ) );
		}

		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register_styles' ) );
	}

	public static function register_styles(): void {
		wp_register_style(
			'fi-schema-fiscal-outil',
			false,
			array(),
			self::VERSION
		);

		global $post;
		if ( $post instanceof WP_Post ) {
			foreach ( self::SHORTCODES as $shortcode ) {
				if ( has_shortcode( (string) $post->post_content, $shortcode ) ) {
					self::enqueue_styles();
					break;
				}
			}
		}
	}

	private static function enqueue_styles(): void {
		wp_enqueue_style( 'fi-schema-fiscal-outil' );
		if ( self::$styles_added ) {
			return;
		}
		self::$styles_added = true;
		wp_add_inline_style(
			'fi-schema-fiscal-outil',
			'.fi-schema-fiscal-embed{position:relative;width:100%;max-width:none!important;height:calc(100dvh - var(--wp-admin--admin-bar--height,0px));min-height:720px;margin:0!important;padding:0!important;overflow:hidden;background:#fff;isolation:isolate}.fi-schema-fiscal-embed__frame{display:block;width:100%;height:100%;margin:0!important;padding:0!important;border:0;background:#fff}.fi-schema-fiscal-embed__fallback{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:782px){.fi-schema-fiscal-embed{height:calc(100svh - var(--wp-admin--admin-bar--height,0px));height:calc(100dvh - var(--wp-admin--admin-bar--height,0px));min-height:0}}'
		);
	}

	public static function render_shortcode( $attributes = array() ): string {
		self::enqueue_styles();
		$attributes = shortcode_atts(
			array(
				'titre' => 'Outil de schéma fiscal',
			),
			(array) $attributes,
			'outil_schema_fiscal'
		);

		$title   = sanitize_text_field( (string) $attributes['titre'] );
		$app_url = add_query_arg(
			array(
				'ver'  => self::VERSION,
				'lang' => 'fr',
			),
			plugins_url( 'app/index.html', __FILE__ )
		);

		return sprintf(
			'<div class="fi-schema-fiscal-embed"><iframe class="fi-schema-fiscal-embed__frame" src="%1$s" title="%2$s" loading="eager" referrerpolicy="no-referrer" allow="clipboard-write"></iframe><a class="fi-schema-fiscal-embed__fallback" href="%1$s">%3$s</a></div>',
			esc_url( $app_url ),
			esc_attr( $title ),
			esc_html__( 'Ouvrir l’outil de schéma fiscal', 'schema-fiscal-outil' )
		);
	}
}

FI_Schema_Fiscal_Outil::init();
