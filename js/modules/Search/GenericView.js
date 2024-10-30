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
window.GLPI=window.GLPI||{},window.GLPI.Search=window.GLPI.Search||{},window.GLPI.Search.GenericView=class{constructor(e){this.element_id=e,this.getElement()&&this.registerListeners()}postInit(){}getElement(){return $("#"+this.element_id)}getResultsView(){return this.getElement().closest(".ajax-container.search-display-data").data("js_class")}showLoadingSpinner(){const e=this.getElement().parent();let s=e.find("div.spinner-overlay");0===s.length?(e.append(`\n            <div class="spinner-overlay text-center">\n                <div class="spinner-border" role="status">\n                    <span class="sr-only">${__("Loading...")}</span>\n                </div>\n            </div>`),s=e.find("div.spinner-overlay")):s.css("visibility","visible")}hideLoadingSpinner(){this.getElement().parent().find("div.spinner-overlay").css("visibility","hidden")}registerListeners(){const e=this.getResultsView().getAJAXContainer().closest(".search-container");$(e).on("click","a.bookmark_record.save",(()=>{const e=$("#savedsearch-modal");e.appendTo("body"),e.empty(),e.html(`\n            <div class="modal-dialog modal-lg">\n                <div class="modal-content">\n                    <div class="modal-header"><h5 class="modal-title">${__("Save current search")}</h5>\n                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${__("Close")}"></button>\n                    </div>\n                    <div class="modal-body"></div>\n                </div>\n            </div>\n            `);const s=new bootstrap.Modal(e.get(0),{show:!1});e.on("show.bs.modal",(()=>{const s=JSON.parse(e.attr("data-params"));s.url=window.location.pathname+window.location.search,e.find(".modal-body").load(CFG_GLPI.root_doc+"/ajax/savedsearch.php",s)})),s.show()}))}onSearch(){this.refreshResults()}refreshResults(){}};export default window.GLPI.Search.GenericView;