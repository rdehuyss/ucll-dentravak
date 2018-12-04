package be.ucll.da.dentravak.controllers;

import be.ucll.da.dentravak.Application;
import be.ucll.da.dentravak.model.Sandwich;
import be.ucll.da.dentravak.repositories.SandwichRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.math.BigDecimal;

import static be.ucll.da.dentravak.model.SandwichTestBuilder.aDefaultSandwich;
import static be.ucll.da.dentravak.model.SandwichTestBuilder.aSandwich;
import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SandwichControllerIntegrationTest extends AbstractControllerIntegrationTest {

    @Autowired
    private SandwichRepository sandwichRepository;

    @Before
    public void setUpASavedSandwich() {
        sandwichRepository.deleteAll();
    }

    @Test
    public void testGetSandwiches_NoSavedSandwiches_EmptyList() throws JSONException {
        String actualSandwiches = httpGet("/sandwiches");
        String expectedSandwiches = "[]";

        assertThatJson(actualSandwiches).isEqualTo(expectedSandwiches);
    }

    @Test
    public void testPostSandwich() throws JSONException {
        Sandwich sandwich = aDefaultSandwich().build();

        String actualSandwichAsJson = httpPost("/sandwiches", sandwich);
        String expectedSandwichAsJson = "{\"id\":\"${json-unit.ignore}\",\"name\":\"Americain\",\"ingredients\":\"Vlees\",\"price\":4}";

        assertThatJson(actualSandwichAsJson).isEqualTo(expectedSandwichAsJson);
    }

    @Test
    public void testPutSandwich() throws JSONException, IOException {
        Sandwich sandwich = aDefaultSandwich().build();

        String actualSandwichAsJson = httpPost("/sandwiches", sandwich);
        Sandwich savedSandwich = new ObjectMapper().readValue(actualSandwichAsJson, Sandwich.class);
        savedSandwich.setPrice(new BigDecimal("3.2"));

        String actualUpdatedSandwichAsJson = httpPut("/sandwiches/" + savedSandwich.getId(), savedSandwich);
        String expectedUpdatedSandwichAsJson = "{\"id\":\"${json-unit.ignore}\",\"name\":\"Americain\",\"ingredients\":\"Vlees\",\"price\":3.2}";

        assertThatJson(actualUpdatedSandwichAsJson).isEqualTo(expectedUpdatedSandwichAsJson);
    }

    @Test
    public void testGetSandwiches_WithSavedSandwiches_ListWithSavedSandwich() throws JSONException {
        throw new RuntimeException("Implement this test and then the production code");
    }
}
