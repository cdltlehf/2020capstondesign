
#include <Arduino.h>

int led[3] = {12, 27, 25};
int gnd[3] = {14, 26, 33};

int echo_trig = 18;
int echo_echo = 5;

void setup() {

    Serial.begin(115200);
    
    for (int i=0; i<3; i++) {
      pinMode(led[i], OUTPUT);
      digitalWrite(led[i], 1);
    
      pinMode(gnd[i], OUTPUT);
      digitalWrite(gnd[i], 0);
    }

    pinMode(echo_trig, OUTPUT);
    pinMode(echo_echo, INPUT);
}

void loop() {
    static int sec = 0;
    if (sec >= 60) sec=0;
    double duration, distance;
    // 초음파를 보낸다. 다 보내면 echo가 HIGH 상태로 대기하게 된다.
    if (sec%2==1) { digitalWrite(echo_trig, HIGH); }
    else { digitalWrite(echo_trig, LOW); }

    duration = pulseIn(echo_echo, HIGH); 
    distance = (duration/2.0)/29.1;
    int value = ((int)(distance/4.0));

    if (value >= 8) value=0;

    Serial.print("sec: " + String(sec) +"\n");
    Serial.print("duration: " + String(duration) +"\n");
    Serial.print("distance: " + String(distance) +"\n");
    Serial.print("value: " + String(value) +"\n");

    for (int k=0; k<3; k++) digitalWrite(led[k], 0);
    if (value/4==1) { digitalWrite(led[0], 1); }
    value = value%4;
    if (value/2==1) { digitalWrite(led[1], 1); }
    value = value%2;
    if (value==1) { digitalWrite(led[2], 1); }
    
    sec += 1;
}
