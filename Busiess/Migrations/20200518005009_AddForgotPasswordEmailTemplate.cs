using Microsoft.EntityFrameworkCore.Migrations;

namespace Busiess.Migrations
{
    public partial class AddForgotPasswordEmailTemplate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO EmailTemplates(Subject, Message)" +
                                 "VALUES('Forgot Password', 'To reset your password, follow the link <a href=" +
                                 '"' + "{callbackUrl}" + '"' + "> link </a>')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
