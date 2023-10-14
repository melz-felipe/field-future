import { z } from "zod";

const requestSchemaValidator = (schema: Zod.ZodObject<any>) => (req, res, next) => {
  try {
    schema.parse(req);
  } catch (error) {
    return res.status(400).send({
      error: (error as z.ZodError).message
    });
  }

  next();
}

export default requestSchemaValidator;