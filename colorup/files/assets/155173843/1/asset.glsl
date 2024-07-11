uniform vec3 material_emissive;

void getEmission() {
    // Dot the world space normal with the world space directional light vector
    float nDotL = dot(dNormalW, light0_direction);
    // fresnel factor
    float fresnel = 1.0 - max(dot(dNormalW, dViewDirW), 0.0);
    float atmosphereFactor = max(0.0, pow(fresnel * 1.5, 1.5)) - max(0.0, pow(fresnel, 15.0)) * 6.0;
    vec3 atmosphereColorDay = vec3(0.3, 0.7, 1);
    vec3 atmosphereColorDark = vec3(0, 0, 0.5);
    vec3 atmosphereColorSunset = vec3(1, 0.3, 0.1);
    vec3 atmosphereColorNight = vec3(0.05, 0.05, 0.1);
    
    float reflecting = max(0.0, dot(reflect(dViewDirW, dNormalW), light0_direction));
    
    atmosphereColorDark = mix(atmosphereColorDark, atmosphereColorSunset + atmosphereColorSunset * reflecting * 2.0, pow(reflecting, 16.0) * max(0.0, nDotL + 0.7));
    
    vec3 atmosphereColor = mix(atmosphereColorDay, atmosphereColorDark, min(1.0, (nDotL / 2.0 + 0.6) * 1.7));
    atmosphereColor = mix(atmosphereColor, atmosphereColorNight, min(1.0, (nDotL / 2.0 + 0.4) * 1.5));
    atmosphereColor *= atmosphereFactor;
    
    dEmission = atmosphereColor;
}