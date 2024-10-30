<?php

function plugin_version_editdb()
{

    return array('name' => 'Edit Database plugin',
        'author' => 'amira reda',
        'version' => '7.0.0');

}

function plugin_editdb_install()
{
    global $DB;
    $migration = new Migration(200);
    if (!$DB->tableExists('glpi_userdepartments')) {

        $query = "CREATE TABLE `glpi_userdepartments` (`id` int UNSIGNED	NOT NULL,`name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,`comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,`date_mod` timestamp NULL DEFAULT NULL,`date_creation` timestamp NULL DEFAULT NULL ) ENGINE InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC";
        $DB->queryOrDie($query, $DB->error());

//edit user table
        $query2 = "ALTER TABLE `glpi_users` ADD `userdepartments_id` int UNSIGNED NOT NULL";
        $DB->queryOrDie($query2, $DB->error());

    } else {
        $query = "DROP TABLE `glpi_userdepartments`";
        $DB->queryOrDie($query, $DB->error());
        $query = "CREATE TABLE `glpi_userdepartments` LIKE `glpi_usercategories`";

        $DB->queryOrDie($query, $DB->error());
//var_dump($DB->error());
//exit;
        return true;
    }
}
function plugin_editdb_uninstall()
{
    return true;
}
function plugin_editdb_check_config()
{
    return true;
}
