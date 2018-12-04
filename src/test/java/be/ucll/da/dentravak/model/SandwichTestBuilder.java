package be.ucll.da.dentravak.model;

import be.ucll.da.dentravak.model.Sandwich;

import java.math.BigDecimal;

public class SandwichTestBuilder {

    private String name;
    private String ingredients;
    private BigDecimal price;

    private SandwichTestBuilder() {}

    public static SandwichTestBuilder aSandwich() {
        return new SandwichTestBuilder();
    }

    public static SandwichTestBuilder aDefaultSandwich() {
        return aSandwich().withName("Americain").withIngredients("Vlees").withPrice(4.0);
    }

    public SandwichTestBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public SandwichTestBuilder withIngredients(String ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public SandwichTestBuilder withPrice(String price) {
        this.price = new BigDecimal(price);
        return this;
    }

    public SandwichTestBuilder withPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public SandwichTestBuilder withPrice(double price) {
        this.price = new BigDecimal(price);
        return this;
    }

    public Sandwich build() {
        Sandwich sandwich = new Sandwich();
        sandwich.setName(name);
        sandwich.setIngredients(ingredients);
        sandwich.setPrice(price);
        return sandwich;
    }

}
