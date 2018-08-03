package com.shop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Pizza {
	private String name;
	private int price;
	private List<String> bases;
	private List<String> toppings;
	private int id;
	
	public Pizza() {
		this.price = 0;
		this.toppings = new ArrayList<String>();
		this.bases = new ArrayList<String>();
		this.name = "";
		this.id = 0;
	}
	
	public Pizza(String name, Integer price, ArrayList<String> bases, ArrayList<String> toppings, int id) {
		this.name = name;
		this.price = price;
		this.bases = bases;
		this.toppings = toppings;
		this.id = id;
	}
	
	public String getName() {
		return this.name;
	}
	
	public int getPrice() {
		return this.price;
	}
	
	public List<String> getBases() {
		return bases;
	}
	
	public List<String> getToppings() {
		return toppings;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setBases(List<String> bases) {
		this.bases = bases;
	}

	public void setToppings(List<String> toppings) {
		this.toppings = toppings;
	}

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String toString() {
		String aux = "";
		aux += "Name: " + this.name + "\n";
		aux += "Price: " + this.price + "\n";
		aux += "Bases: " + this.bases + "\n";
		aux += "Toppings: " + this.toppings + "\n";
		return aux;	
	}
	
	public void addPizza() throws FileNotFoundException, IOException, ParseException {
		JSONParser parser = new JSONParser();

		Object obj = parser.parse(new FileReader("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json"));
		JSONObject jsonObj = (JSONObject) obj;
		JSONArray json = (JSONArray)jsonObj.get("pizzas");
		
		JSONObject pizza = new JSONObject();
		
		int idPizza = json.size() + 1;
		
		pizza.put("name", this.name);
		pizza.put("price", this.price);
		pizza.put("id", idPizza);

	
		pizza.put("toppings", this.toppings);
		
		JSONArray bases = new JSONArray();
		JSONObject baseJson;
		for (int i = 0; i < this.bases.size(); i++) {
			baseJson = new JSONObject();
			baseJson.put("id", i + 1);
			baseJson.put("name", this.bases.get(i));
			bases.add(baseJson);
		}
		
		pizza.put("base", bases);
		json.add(pizza);
		jsonObj.put("pizzas", json);
		
		try {
			FileWriter file = new FileWriter("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json");
			file.write(jsonObj.toJSONString());
			file.flush();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void modifyPizza() throws FileNotFoundException, IOException, ParseException {
		JSONParser parser = new JSONParser();

		Object obj = parser.parse(new FileReader("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json"));
		JSONObject jsonObj = (JSONObject) obj;
		JSONArray json = (JSONArray)jsonObj.get("pizzas");
		
		JSONObject pizza = new JSONObject();
		
		pizza.put("name", this.name);
		pizza.put("price", this.price);
		pizza.put("id", id);
		
		pizza.put("toppings", this.toppings);

		JSONArray bases = new JSONArray();
		JSONObject baseJson;
		for (int i = 0; i < this.bases.size(); i++) {
			baseJson = new JSONObject();
			baseJson.put("id", i + 1);
			baseJson.put("name", this.bases.get(i));
			bases.add(baseJson);
		}
		
		pizza.put("base", bases);
	
		
		json.remove(id-1);
		json.add(id-1, pizza);
		
		jsonObj.put("pizzas", json);
		
		try {
			FileWriter file = new FileWriter("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json");
			file.write(jsonObj.toJSONString());
			file.flush();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void removePizza(int id) throws FileNotFoundException, IOException, ParseException {
		JSONParser parser = new JSONParser();

		Object obj = parser.parse(new FileReader("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json"));
		JSONObject jsonObj = (JSONObject) obj;
		JSONArray json = (JSONArray)jsonObj.get("pizzas");
		
		json.remove(id-1);
		
		jsonObj.put("pizzas", json);
		
		try {
			FileWriter file = new FileWriter("D:/Users/T0202404/Projects/pizzaShop/pizza-shop/src/pizzas.json");
			file.write(jsonObj.toJSONString());
			file.flush();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
