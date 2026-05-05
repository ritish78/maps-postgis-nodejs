import { getAllPropertiesOnMapPrepared } from "src/db/preparedStatement.js";

export const getAllPropertiesOnMap = async () => {
  try {
    const properties = await getAllPropertiesOnMapPrepared.execute();
    return properties;
  } catch (error) {
    console.error(`${error.message} - (${new Date().toISOString()})`);
  }
};
