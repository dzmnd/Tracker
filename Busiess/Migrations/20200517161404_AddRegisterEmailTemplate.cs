using Microsoft.EntityFrameworkCore.Migrations;

namespace Busiess.Migrations
{
    public partial class AddRegisterEmailTemplate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO EmailTemplates(Subject, Message)" +
                                 "VALUES('Confirm your account', 'Confirm the registration by clicking on the link: <a href=" +
                                 '"' + "{callbackUrl}" + '"' + "> link </a>')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
