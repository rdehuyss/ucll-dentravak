package be.ucll.da.dentravak.controllers;

import be.ucll.da.dentravak.Application;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class AbstractControllerIntegrationTest {

    @LocalServerPort
    private int port;

    TestRestTemplate restTemplate;

    HttpHeaders headers;

    public AbstractControllerIntegrationTest() {
        this.headers = new HttpHeaders();
        this.headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
        restTemplate = new TestRestTemplate(new RestTemplateBuilder()
                .setConnectTimeout(5000)
                .setReadTimeout(5000));
    }

    protected String httpGet(String url) {
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort(url),
                HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    protected String httpPost(String url, Object obj) {
        return httpRequest(url, obj, HttpMethod.POST);
    }

    protected String httpPut(String url, Object obj) {
        return httpRequest(url, obj, HttpMethod.PUT);
    }

    protected String httpRequest(String url, Object obj, HttpMethod method) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            HttpEntity<String> entity = new HttpEntity<String>(mapper.writeValueAsString(obj), headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    createURLWithPort(url),
                    method, entity, String.class);

            return response.getBody();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private String createURLWithPort(String uri) {
        if(uri.startsWith("http")) return uri;
        return "http://localhost:" + port + uri;
    }
}
