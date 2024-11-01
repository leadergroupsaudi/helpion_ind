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
function refreshAssetBreadcrumb(e,t,o){$.ajax({method:"GET",url:CFG_GLPI.root_doc+"/ajax/cable.php",data:{action:"get_item_breadcrum",items_id:t,itemtype:e}}).done((function(e){$("#"+o).empty(),$("#"+o).append(e)}))}function refreshNetworkPortDropdown(e,t,o){$.ajax({method:"GET",url:CFG_GLPI.root_doc+"/ajax/cable.php",data:{action:"get_networkport_dropdown",items_id:t,itemtype:e}}).done((function(e){$("#"+o).empty(),$("#"+o).append(e)}))}function refreshSocketDropdown(e,t,o,a){$.ajax({method:"GET",url:CFG_GLPI.root_doc+"/ajax/cable.php",data:{action:"get_socket_dropdown",items_id:t,itemtype:e,socketmodels_id:o,dom_name:a}}).done((function(e){var t=$('select[name="'+a+'"]').parent().parent();t.empty(),t.append(e)}))}