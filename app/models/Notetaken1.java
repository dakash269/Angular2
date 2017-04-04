package models;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Model;
//import org.openqa.selenium.lift.find.Finder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Notetaken1 extends Model{
    public static Finder<String, Notetaken1> find = new Finder<String, Notetaken1>(String.class, Notetaken1.class);

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    public long id;

    @ManyToOne @Column(columnDefinition="TEXT")
    private String user;

    @Column(columnDefinition="TEXT")
    private String content;

    @Column(columnDefinition="TEXT")
    private String title;

    @Column(name="timestamp",columnDefinition="timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private String date;

    @Column(columnDefinition="TEXT")
    private String reminder;

    @Column(columnDefinition="int ")
    private Integer isArchive;

    @Column(columnDefinition="int")
    private Integer isTrash;


    public Notetaken1(String user, String title, String content,String reminder,int isArchive,int isTrash)
    {
        this.setUser(user);
        this.setTitle(title);
        this.setContent(content);
        this.setReminder(reminder);
        this.setisArchive(isArchive);
        this.setisTrash(isTrash);
    }

    public Notetaken1(long id,String title,String content,int isArchive,int isTrash){
        this.setId(id);
        this.setisTrash(1);
        this.setisArchive(0);
    }
    public Notetaken1(long id,int isArchive){
        this.setId(id);
          this.setisArchive(1);
    }
    public Notetaken1(long id,String title,String content,int isTrash){
        this.setId(id);
        this.setisTrash(1);

    }
    public Notetaken1(long id,String title,int isArchive){
        this.setId(id);
        this.setisArchive(0);
    }
    public Notetaken1(long id,String title,int isArchive,int isTrash){
        this.setId(id);
        this.setisTrash(0);

    }
    public Notetaken1(long id,String user, String title, String content,String reminder,int isArchive,int isTrash)
    {
        Notetaken1 n = Ebean.find(Notetaken1.class).where().eq("id", id).findUnique();
        this.setUser(user);
        this.setTitle(title);
        this.setContent(content);
        this.setReminder(reminder);
        this.setisArchive(isArchive);
        this.setisTrash(isTrash);
    }

    public static List<Notetaken1> getData(String email) {
    List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
    List<Notetaken1> temp = new ArrayList<>();
        for (Notetaken1 aList1 : list1) {
            if (aList1.getUser().trim().compareTo(email.trim())==0 && (!Objects.equals(aList1.getisArchive(), 1)&& !Objects.equals(aList1.getisTrash(), 1))) {
                temp.add(aList1);
            }
        }
        return temp;
    }
  public static List<Notetaken1> getData1() {
    List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
    List<Notetaken1> temp = new ArrayList<>();
    for (Notetaken1 aList1 : list1) {
      if ((!Objects.equals(aList1.getisArchive(), 1)&& !Objects.equals(aList1.getisTrash(), 1))) {
        temp.add(aList1);
      }
    }
    return temp;
  }

    public static List<Notetaken1> getReminder(String email) {
        List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
        List<Notetaken1> temp = new ArrayList<>();
        for (Notetaken1 aList1 : list1) {
            if (aList1.getUser().trim().compareTo(email.trim())==0 && !Objects.equals(aList1.getReminder(), ""))
            {
                temp.add(aList1);
            }
        }
        return temp;
    }
    public static List<Notetaken1> getArchive(String email) {
        List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
        List<Notetaken1> temp = new ArrayList<>();
        for (Notetaken1 aList1 : list1) {
            if (aList1.getUser().trim().compareTo(email.trim())==0 && !Objects.equals(aList1.getisArchive(), 0)) {
                temp.add(aList1);
            }
        }
        return temp;
    }
  public static List<Notetaken1> getArchive1(String email) {
    List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
    List<Notetaken1> temp = new ArrayList<>();
    for (Notetaken1 aList1 : list1) {
      if (!Objects.equals(aList1.getisArchive(), 0)) {
        temp.add(aList1);
      }
    }
    return temp;
  }
    public static List<Notetaken1> getTrash(String email) {
        List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
        List<Notetaken1> temp = new ArrayList<>();
        for (Notetaken1 aList1 : list1) {
            if (aList1.getUser().trim().compareTo(email.trim())==0 && !Objects.equals(aList1.getisTrash(), 0)) {
                temp.add(aList1);
            }
        }
        return temp;
    }
  public static List<Notetaken1> getTrash1(String email) {
    List<Notetaken1> list1 = Ebean.find(Notetaken1.class).findList();
    List<Notetaken1> temp = new ArrayList<>();
    for (Notetaken1 aList1 : list1) {
      if (!Objects.equals(aList1.getisTrash(), 0)) {
        temp.add(aList1);
      }
    }
    return temp;
  }

    public int getisArchive() { return isArchive;}

    public void setisArchive(int isArchive) {this.isArchive = isArchive;}

    public int getisTrash() { return isTrash;}

    public void setisTrash(int isTrash) {this.isTrash= isTrash;}

    public String getReminder() { return reminder;}

    public void setReminder(String reminder) {this.reminder = reminder;}

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public long getId() {return id;}

    public void setId(long id){ this.id = id; }
}
