#!/usr/bin/env node
/**
 * Validate every skill against the Agent Skills format and against Saddle's
 * real tool list, so a skill can never tell an agent to call a tool that
 * doesn't exist.
 *
 *   node scripts/validate.mjs
 *
 * scripts/tools.txt is exported from the Saddle plugin (see README, "Keeping
 * the skills true"). Tool families that belong to other plugins — saddle-rank-*
 * (Saddle Rank), saddle-knovia-* — and placeholder forms like
 * saddle-<plugin>-get-post-seo are skipped.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join( dirname( fileURLToPath( import.meta.url ) ), '..' );
const tools = new Set( readFileSync( join( root, 'scripts/tools.txt' ), 'utf8' ).split( /\s+/ ).filter( Boolean ) );
const external = /^saddle-(rank|knovia|analytics|crm)-/;
const errors = [];

for ( const dir of readdirSync( join( root, 'skills' ) ) ) {
	const file = join( root, 'skills', dir, 'SKILL.md' );
	if ( ! existsSync( file ) ) {
		errors.push( `${ dir }: no SKILL.md` );
		continue;
	}
	const text = readFileSync( file, 'utf8' );
	const front = text.match( /^---\n([\s\S]*?)\n---\n/ );
	if ( ! front ) {
		errors.push( `${ dir }: missing frontmatter` );
		continue;
	}
	const name = ( front[ 1 ].match( /^name:\s*(.+)$/m ) || [] )[ 1 ];
	const description = ( front[ 1 ].match( /^description:\s*(.+)$/m ) || [] )[ 1 ] || '';

	// Agent Skills spec: name is 1–64 chars of lowercase letters, digits and
	// hyphens, and matches the folder; description is 1–1024 chars.
	if ( name !== dir ) {
		errors.push( `${ dir }: name "${ name }" must match the folder` );
	}
	if ( ! /^[a-z0-9]+(-[a-z0-9]+)*$/.test( name || '' ) || name.length > 64 ) {
		errors.push( `${ dir }: name must be lowercase words joined by hyphens, max 64` );
	}
	if ( ! description || description.length > 1024 ) {
		errors.push( `${ dir }: description must be 1–1024 characters (is ${ description.length })` );
	}

	for ( const [ tool ] of text.matchAll( /\bsaddle-[a-z0-9-]*[a-z0-9]\b/g ) ) {
		const isSkill = existsSync( join( root, 'skills', tool ) );
		const isServerName = tool.startsWith( 'saddle-mysite' ) || tool === 'saddle-site' || tool === 'saddle-to';
		if ( isSkill || isServerName || tools.has( tool ) || external.test( tool ) ) {
			continue;
		}
		// A family prefix like "saddle-divi-" in prose ("the saddle-divi-* tools").
		if ( [ ...tools ].some( ( t ) => t.startsWith( tool + '-' ) ) ) {
			continue;
		}
		errors.push( `${ dir }: unknown tool "${ tool }"` );
	}
}

if ( errors.length ) {
	console.error( errors.join( '\n' ) );
	process.exit( 1 );
}
console.log( `ok: ${ readdirSync( join( root, 'skills' ) ).length } skills, every tool name real` );
