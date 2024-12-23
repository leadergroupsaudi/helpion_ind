/**
 * ---------------------------------------------------------------------
 *
 * GLPI - Gestionnaire Libre de Parc Informatique
 *
 * http://glpi-project.org
 *
 * @copyright 2015-2024 Teclib' and contributors.
 * @copyright 2003-2014 by the INDEPNET Development Team.
 * @licence   https://www.gnu.org/licenses/gpl-3.0.html
 *
 * ---------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of GLPI.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * ---------------------------------------------------------------------
 */
var GLPI=GLPI||{};GLPI.Forms=GLPI.Forms||{},GLPI.Forms.FaIconSelector=class{constructor(e){this.selectElement=e}init(){const e=this.fetchAvailableIcons();$(this.selectElement).select2({data:e,templateResult:this.renderIcon,templateSelection:this.renderIcon})}fetchAvailableIcons(){var e=[];for(let t=0;t<document.styleSheets.length;t++){const n=document.styleSheets[t].cssRules;for(let t=0;t<n.length;t++){const s=n[t];if("CSSStyleRule"!==s.constructor.name)continue;const l=s.selectorText.split(",");for(let t=0;t<l.length;t++){let n=l[t].trim().match(/^\.(fa-[a-z-]+)::before$/);if(null!==n){const t=n[1],s={id:t,text:t};e.includes(s)||e.push(s)}}}}return e}renderIcon(e){let t=document.createElement("span");return t.innerHTML=`<i class="fa-lg fa-fw fa ${e.id}" style="font-family:'Font Awesome 6 Free', 'Font Awesome 6 Brands';"></i> ${e.id}`,t}};