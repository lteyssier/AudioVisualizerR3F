uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;


vec3 palette(float t ){
    vec3 a = vec3(0.5, 0.5 , 0.5);
    vec3 b = vec3(0.5, 0.5 , 0.5);
    vec3 c = vec3(1.0, 1.0 , 1.0);
    vec3 d = vec3(0.00, 0.10 , 0.20);

    return a + b*cos(6.28318*(c*t+d));
}

void main()
{
    vec2 uv = vUv.xy*2.0-1.0;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

for( float i=0.0; i<8.0; i++){
    uv = fract(uv * 1.7)-0.5;

    float d = 10.0 + length(uv) * exp(-length(uv0));

    vec3 col = palette(length(uv0) + i*.3 + u_time*.4);


    d = sin(d*8.0 + u_time)/5.0;
    d = abs(d);

    d= pow(0.01/d , 1.2);

    finalColor += col * d;

}
    gl_FragColor = vec4(finalColor ,1.0);
}