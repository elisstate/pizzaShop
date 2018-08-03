package com.shop;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/menuModify")
public class MenuController {
	
	@RequestMapping(value = "/newPizza", method = RequestMethod.POST) 
	public void addNewPizza(@RequestBody Pizza pizza) {
		try {
			pizza.addPizza();
		} catch (IOException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping(value = "/pizza", method = RequestMethod.POST)
	public void modifyPizza(@RequestBody Pizza pizza) {
		try {
			pizza.modifyPizza();
		} catch (IOException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/removePizza", method = RequestMethod.POST)
	public void removePizza(@RequestBody String id ) {
		int x = Integer.parseInt(id.substring(0,id.length()-1));
		try {
			Pizza.removePizza(x);
		} catch (IOException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
