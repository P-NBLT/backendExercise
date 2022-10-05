const app = require("./app");
const request = require("supertest");
const testApp = request(app);

test("Read the text on the port", async () => {
  const path = "/";

  const response = await testApp.get("/");

  expect(response.text).toBe("Hello");
});

test("Send agency to /agencies", async () => {
  const path = "/agencies";
  const newAgency = { name: "Pits", city: "Amsterdam" };
  const response = await testApp.post(path).send(newAgency);

  const agenciesRes = response.body;
  const lastIndex = agenciesRes.agencies.length - 1;

  expect(response.status).toBe(201);
  expect(agenciesRes.success).toEqual(true);
  expect(agenciesRes.agencies[lastIndex]).toEqual({
    name: "Pits",
    city: "Amsterdam",
  });
});

test("Read agency at the id: index of the agencies array", async () => {
  const agencies = [
    { name: "Pits", city: "Amsterdam", id: 1 },
    { name: "Marti", city: "Amsterdam", id: 2 },
    { name: "Antic", city: "Rotterdam", id: 3 },
  ];
  const random = Math.floor(Math.random() * 3);
  const id = agencies[random].id;
  const agency = agencies.find((agency) => agency.id == id);
  const response = await testApp.get(`/agencies/${id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual(agency);
});

test("Modify agency at the id: index of the agencies array", async () => {
  const modifiedAgency = { name: "Tech", city: "Rotterdam", id: 2 };
  const path = "/agencies/2";

  const response = await testApp.patch(path).send(modifiedAgency);

  expect(response.status).toBe(200);
  expect(response.body).toEqual(modifiedAgency);
});
