/**
 * @swagger
 * components:
 *   schemas:
 *     Vaccine:
 *       type: object
 *       properties:
 *         vaccine_name_th:
 *           type: string
 *         vaccine_name_en:
 *           type: string
 *         type:
 *           type: string
 *         number_for_next_dose:
 *           type: integer
 *           description: Number for the next dose
 *         dose_require:
 *           type: integer
 *           description: Total dose required
 *         description:
 *           type: string
 *       required:
 *         - vaccine_name_th
 *         - vaccine_name_en
 *         - type
 *         - number_for_next_dose
 *         - dose_require
 */

/**
 * @swagger
 * tags:
 *   name: Vaccine
 *   description: Operations related to vaccines
 */

/**
 * @swagger
 * /api/vaccine:
 *   get:
 *     summary: Get all vaccine data
 *     tags: [Vaccine]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: []
 */

/**
 * @swagger
 * /api/vaccine:
 *   post:
 *     summary: Create a new vaccine record
 *     tags: [Vaccine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaccine'
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /api/vaccine/{id}:
 *   put:
 *     summary: Update a vaccine record by ID
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vaccine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaccine'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaccine'
 *       404:
 *         description: Vaccine not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine not found
 */

/**
 * @swagger
 * /api/vaccine/{id}:
 *   delete:
 *     summary: Delete a vaccine record by ID
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vaccine to delete
 *     responses:
 *       200:
 *         description: Vaccine deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine deleted successfully
 *       404:
 *         description: Vaccine not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine not found
 */

/**
 * @swagger
 * /api/vaccine/search-vaccine-by-name/{name}:
 *   get:
 *     summary: Search vaccines by name
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the vaccine to search
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaccine'
 *       404:
 *         description: Vaccine not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine not found
 */
