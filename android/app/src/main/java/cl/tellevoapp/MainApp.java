package cl.tellevoapp;

import android.app.Application;

import com.google.firebase.FirebaseApp;

public class MainApp extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseApp.initializeApp(this);
    // Otro código de inicialización si es necesario
  }
}
