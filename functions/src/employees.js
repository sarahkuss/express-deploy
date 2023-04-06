import { db } from "./dbConnect.js";
// Imported to get timestamp (1/2)
import { FieldValue } from "firebase-admin/firestore";

const coll = db.collection("employees")

export async function addEmployee(req, res) {
  const newEmployee = req.body
  // Insert timestamp (2/2)
  newEmployee.createdAt = FieldValue.serverTimestamp()
  await coll.add(newEmployee)
  res.status(201).send({ message: "Employee successfully added." })
}


export async function getAllEmployees(req, res) {
  const collection = await coll.get()
    //.catch (err => res.status(500).send(err))
  const employees = collection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.status(200).send(employees)
}

export async function deleteEmployee(req, res) {
  const { id } = req.params
  // const id = req.params.id the same as ^^
  await coll.doc(id).delete()
  res.status(202).send("Employee has been deleted.")
}

export async function updateEmployee(req, res) {
  const { id } = req.params
  const updateInfo = req.body
  await coll.doc(id).update(updateInfo)
  res.status(202).send("Employee has been updated")
}
