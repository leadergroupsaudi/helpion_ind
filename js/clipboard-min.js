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
function copyTextToClipboard(e){var o=document.createElement("textarea");o.value=e,o.setAttribute("readonly",""),o.style={position:"absolute",visibility:"hidden"},document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}$((function(){$(document).on("click",".copy_to_clipboard_wrapper",(function(e){var o,t=$(e.target);"copy_to_clipboard_wrapper"==t.attr("class")&&(t=t.find("*")),t.select();try{o=document.execCommand("copy")}catch(e){o=!1}t.blur(),o?($(".copy_to_clipboard_wrapper.copied").removeClass("copied"),t.parent(".copy_to_clipboard_wrapper").addClass("copied")):t.parent(".copy_to_clipboard_wrapper").addClass("copyfail")}))}));