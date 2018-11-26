package be.ucll.da.dentravak.controllers;

import be.ucll.da.dentravak.Application;
import be.ucll.da.dentravak.model.Sandwich;
import be.ucll.da.dentravak.model.SandwichOrder;
import be.ucll.da.dentravak.model.SandwichTestBuilder;
import be.ucll.da.dentravak.repositories.SandwichOrderRepository;
import be.ucll.da.dentravak.repositories.SandwichRepository;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static be.ucll.da.dentravak.model.SandwichOrderTestBuilder.aSandwichOrder;
import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SandwichOrderControllerIntegrationTest extends AbstractControllerIntegrationTest {

    @Autowired
    private SandwichRepository sandwichRepository;
    @Autowired
    private SandwichOrderRepository sandwichOrderRepository;

    private Sandwich savedSandwich;

    @Before
    public void setUpASavedSandwich() {
        sandwichRepository.deleteAll();
        sandwichOrderRepository.deleteAll();
        savedSandwich = sandwichRepository.save(SandwichTestBuilder.aSandwich().withName("Americain").withIngredients("vlees").withPrice(3.5).build());
    }

    @Test
    public void testGetSandwichOrders_NoOrdersSaved_EmptyList() throws JSONException {
        String actualSandwiches = httpGet("/orders");
        String expectedSandwiches = "[]";

        assertThatJson(actualSandwiches).isEqualTo(expectedSandwiches);
    }

    @Test
    public void testPostSandwichOrder() throws JSONException {
        SandwichOrder sandwichOrder = aSandwichOrder().forSandwich(savedSandwich).withBreadType(SandwichOrder.BreadType.BOTERHAMMEKES).withMobilePhoneNumber("0487/123456").build();
        String actualSandwiches = httpPost("/orders", sandwichOrder);
        String expectedSandwiches = "{\"id\":\"${json-unit.ignore}\",\"sandwichId\":\"" + savedSandwich.getId() + "\",\"name\":\"Americain\",\"breadType\":\"BOTERHAMMEKES\",\"creationDate\":\"${json-unit.ignore}\",\"price\":3.5,\"mobilePhoneNumber\":\"0487/123456\"}";

        assertThatJson(actualSandwiches).isEqualTo(expectedSandwiches);
    }

    @Test
    public void testGetSandwichOrders_WithOrdersSaved_ReturnsListWithOrders() throws JSONException {
        throw new RuntimeException("Implement this test and then the production code");
    }

}
