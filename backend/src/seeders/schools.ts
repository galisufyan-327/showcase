import School from "../models/School";

const schools = [
  "LGS",
  "APS",
  "Garrison",
  "Oxford",
  "Harry",
  "Some dummy school",
];

export default async function seedSchoolsIntoDatabase() {
  const schoolsCreated: any[] = [];
  schools.forEach(async (item) => {
    console.log("Adding school %s", item);
    const schoolFound = await School.findOne({ name: item });
    if (schoolFound) {
      return;
    }
    const school = await School.create({ name: item });
    schoolsCreated.push(school);
    console.log("Adding school %s", item);
  });

  return schoolsCreated;
}
