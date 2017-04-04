package controllers;

import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.databind.JsonNode;
import models.Notetaken1;
import models.Registration;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class HomeController extends Controller {
  public Result get() {
    List<Notetaken1> card= Notetaken1.getData1();
    return ok(Json.toJson(card));
  }
  @Security.Authenticated(Secured.class)
  public Result send() {
    JsonNode jsonNode=request().body().asJson();
    int isArchive=jsonNode.path("isArchive").asInt();
    int isTrash=jsonNode.path("isTrash").asInt();
    String user=jsonNode.path("user").asText();
    String title=jsonNode.path("title").asText();
    String content=jsonNode.path("content").asText();
    String reminder=jsonNode.path("reminder").asText();
    String rem=reminder;
    if (!Objects.equals(reminder, ""))
    {
      Date now = new Date();
      SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("MM/dd/yyyy HH:mm");
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm");
      try {
        reminder = simpleDateFormat1.format(simpleDateFormat.parse(reminder));
        Date date = simpleDateFormat1.parse(reminder);
        Notetaken1 posts = new Notetaken1(user, title, content, rem, isArchive, isTrash);
        posts.save();
      }
      catch (ParseException ex)
      { System.out.println("Exception " + ex);}
    }
    else
    {Notetaken1 posts = new Notetaken1(user, title, content, "", isArchive, isTrash);
      posts.save();}
    return ok("Post added successfully");
  }
  public Result reg() {
    JsonNode jsonNode = request().body().asJson();
    String userName = jsonNode.path("userName").asText();
    String userEmail = jsonNode.path("userEmail").asText().toLowerCase();
    String userPassword = jsonNode.path("userPassword").asText();;
    Registration reg = new Registration(userName, userEmail, userPassword);
    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(userEmail);
    if (userEmail.equals("") || userPassword.equals("") || userName.equals("") || userEmail.equals("") || userPassword.equals("") || userName.equals("")) {
      return badRequest("Fields cannot be empty or null.");
    } else if (!matcher.find()) {
      return badRequest("Not a valid email! Please try again.");
    } else if (Registration.isPresent(userEmail) != null) {
      return badRequest("Mail id is already registered.Try logging in!!");
    } else {
      reg.save();
      session().clear();
      session("email", userEmail);
    }
    return ok(" Successs");
  }
  public Result log() {
    JsonNode jsonNode = request().body().asJson();
    String userEmail = jsonNode.path("userEmail").asText().toLowerCase();
    String userPassword = jsonNode.path("userPassword").asText();;
    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(userEmail);
    if (!matcher.find()) {
      return badRequest("Not a valid email!! Please try again.");
    }
    Registration user = Ebean.find(Registration.class).where().eq("userEmail", userEmail).findUnique();
    if (user == null) {
      return badRequest("Email is not registered!!");
    } else {
      String db_password = user.getUserPassword();
      if ((userPassword.equals(db_password))) {
        session().clear();
        session("email", userEmail);
        return ok(" Successs");
      } else {
        return badRequest("Password is wrong! Please try again.");
      }
    }
  }
  public Result register() {
    JsonNode jsonNode = request().body().asJson();
    String userName = jsonNode.path("userName").asText();
    String userEmail = jsonNode.path("userEmail").asText().toLowerCase();
    String userPassword = jsonNode.path("userPassword").asText();
    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(userEmail);
    if (userEmail.equals("") || userPassword.equals("") || userName.equals("") || userEmail.equals("") || userPassword.equals("") || userName.equals("")) {
      return badRequest("Fields cannot be empty or null.");
    } else if (!matcher.find()) {
      return badRequest("Not a valid email! Please try again.");
    } else if (Registration.isPresent(userEmail) != null) {
      return badRequest("Mail id is already registered.Try logging in!!");
    } else {
      Registration reg = new Registration(userName, userEmail, userPassword);
      reg.save();
      session().clear();
      session("email", userEmail);
      return ok("Success");
    }
  }
  public Result loginnow() {
    JsonNode jsonNode = request().body().asJson();
    String userEmail = jsonNode.path("userEmail").asText().toLowerCase();
    String userPassword = jsonNode.path("userPassword").asText();
    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(userEmail);
    if (!matcher.find()) {
      return badRequest("Not a valid email!! Please try again.");
    }
    Registration user = Ebean.find(Registration.class).where().eq("userEmail", userEmail).findUnique();
    if (user == null) {
      return badRequest("Email is not registered!!");
    } else {
      String db_password = user.getUserPassword();
      if ((userPassword.equals(db_password))) {
        session().clear();
        session("email", userEmail);
        return ok("Login Successs");
      } else {
        return badRequest("Password is wrong! Please try again.");
      }
    }
  }

    public Result getArchive(){
        List<Notetaken1> card= Notetaken1.getArchive(session().get("email"));
        return ok(Json.toJson(card));
    }
  public Result getArchive1(){
    List<Notetaken1> card= Notetaken1.getArchive1(session().get("email"));
    return ok(Json.toJson(card));
  }
    public Result getTrash(){
        List<Notetaken1> card= Notetaken1.getTrash(session().get("email"));
        return ok(Json.toJson(card));
    }
  public Result getTrash1(){
    List<Notetaken1> card= Notetaken1.getTrash1(session().get("email"));
    return ok(Json.toJson(card));
  }
    public Result getReminder()
    {
        List<Notetaken1> card = Notetaken1.getReminder(session().get("email"));
        return ok(Json.toJson(card));
    }

    public Result archive() {
        JsonNode jsonNode = request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        int isArchive=jsonNode.path("isArchive").asInt();
        Notetaken1 c=new Notetaken1(id,isArchive);
        c.update();
        return ok();
    }
    public Result del(){
        JsonNode jsonNode=request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        int isTrash=jsonNode.path("isTrash").asInt();
        String title=jsonNode.path("title").asText();
        String content=jsonNode.path("content").asText();
        Notetaken1 c=new Notetaken1(id,title,content,isTrash);
        c.update();
        return ok();
    }
     public Result delT(){
        JsonNode jsonNode=request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        Notetaken1.find.ref(String.valueOf(id)).delete();
        return ok();
    }
    public Result delA(){
        JsonNode jsonNode=request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        int isTrash=jsonNode.path("isTrash").asInt();
        String title=jsonNode.path("title").asText();
        String content=jsonNode.path("content").asText();
        int isArchive=jsonNode.path("isArchive").asInt();
        Notetaken1 c=new Notetaken1(id,title,content,isArchive,isTrash);
        c.update();
        return ok();
    }

    public Result unarchive() {
        JsonNode jsonNode = request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        String title=jsonNode.path("title").asText();
        int isArchive=jsonNode.path("isArchive").asInt();
        Notetaken1 c=new Notetaken1(id,title,isArchive);
        c.update();
        return ok();
    }
    public Result movetonote() {
        JsonNode jsonNode = request().body().asJson();
        Long id=jsonNode.path("id").asLong();
        String title=jsonNode.path("title").asText();
        int isArchive=jsonNode.path("isArchive").asInt();
        int isTrash=jsonNode.path("isTrash").asInt();
        Notetaken1 c=new Notetaken1(id,title,isArchive,isTrash);
        c.update();
        return ok();
    }

    public Result addNotetaken(){
        JsonNode jsonNode=request().body().asJson();
        String user=jsonNode.path("user").asText();
        String title=jsonNode.path("title").asText();
        String content=jsonNode.path("content").asText();
        String reminder=jsonNode.path("reminder").asText();
        int isArchive=jsonNode.path("isArchive").asInt();
        int isTrash=jsonNode.path("isTrash").asInt();
        String rem=reminder;
        if (!Objects.equals(reminder, ""))
        {
            Date now = new Date();
            SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("MM/dd/yyyy HH:mm");
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm");
            try {
              System.out.print("hi");
                reminder = simpleDateFormat1.format(simpleDateFormat.parse(reminder));
                Date date = simpleDateFormat1.parse(reminder);
                Notetaken1 posts = new Notetaken1(user, title, content, rem, isArchive, isTrash);
                posts.save();
                }
                catch (ParseException ex)
               {System.out.println("Exception " + ex);}
        }
        else
        {
          System.out.print("hi");
            Notetaken1 posts = new Notetaken1(user, title, content, "", isArchive, isTrash);
            posts.save();
        }
        return ok("Post added successfully");
    }

    public Result getPosts() {
        List<Notetaken1> card= Notetaken1.getData(session().get("email"));
        return ok(Json.toJson(card));
    }


    public Result regis() {
        return ok(registration.render(""));
    }

    public Result login() {return ok(login.render("Login"));}

    @Security.Authenticated(Secured.class)
    public Result note() { return ok(note.render("note",session().get("email")));}

    @Security.Authenticated(Secured.class)
    public Result Reminder() {return ok(Reminder.render("Reminder",session().get("email")));}

    @Security.Authenticated(Secured.class)
    public Result Archive() { return ok(Archive.render("Archive",session().get("email")));}

    @Security.Authenticated(Secured.class)
    public Result Trash() { return ok(Trash.render("Trash",session().get("email")));}

    public Result logout() {
        session().clear();
        flash("success", "You've been logged out");
        return redirect(routes.Application.index());
    }
    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);


}

