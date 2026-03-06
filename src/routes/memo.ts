import createMemo from "../controllers/memo/create-memo";
import { Router } from "express";
import deleteMemo from "../controllers/memo/delete-memo";
import editMemo from "../controllers/memo/edit-memo";
import getInbox from "../controllers/memo/inbox";
import getDraftMemos from "../controllers/memo/drafts";
import getSentMemos from "../controllers/memo/get-sent-memos";
import getMemoById from "../controllers/memo/get-memo";
import deleteMemoForUser from "../controllers/memo/delete-for-user";
import permanentDelete from "../controllers/memo/delete-memo";
const memoRouter = Router();

/**
 * @openapi
 * tags:
 *   name: Memos
 *   description: Memo creation, retrieval, editing, and deletion. All routes require authentication.
 */

/**
 * @openapi
 * /api/memo/send:
 *   post:
 *     tags: [Memos]
 *     summary: Create and optionally send a memo
 *     description: >
 *       Creates a new memo for the authenticated user. If `sharedWith` is
 *       provided and non-empty the memo is sent to those recipients; otherwise
 *       it is saved as a draft.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 example: Q1 Report
 *               content:
 *                 type: string
 *                 example: Please find the Q1 report attached.
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *                 example: [finance, q1]
 *               isDraft:
 *                 type: boolean
 *                 example: false
 *               sharedWith:
 *                 type: array
 *                 items: { type: string }
 *                 description: Array of recipient user IDs
 *                 example: ["64f1a2b3c4d5e6f7a8b9c0d3"]
 *     responses:
 *       201:
 *         description: Memo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Memo'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.post("/send", createMemo);

/**
 * @openapi
 * /api/memo/edit/{id}:
 *   put:
 *     tags: [Memos]
 *     summary: Edit an existing memo
 *     description: Updates a memo owned by the authenticated user. Only the owner can edit.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Memo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               content:
 *                 type: string
 *                 example: Updated content body.
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *               isDraft:
 *                 type: boolean
 *               sharedWith:
 *                 type: array
 *                 items: { type: string }
 *                 description: Array of recipient user IDs
 *     responses:
 *       200:
 *         description: Memo edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Memo'
 *       401:
 *         description: Unauthorized – not the memo owner or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Memo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.put("/edit/:id", editMemo);

/**
 * @openapi
 * /api/memo/delete/{id}:
 *   delete:
 *     tags: [Memos]
 *     summary: Soft-delete a memo for the current user
 *     description: >
 *       Hides the memo from the authenticated user's view (soft delete). The
 *       memo is added to the user's `hiddenMemos` list and is no longer returned
 *       in their inbox or sent views. The memo is **not** permanently deleted.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Memo ID
 *     responses:
 *       200:
 *         description: Memo deleted (hidden) successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Memo ID is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.delete("/delete/:id", deleteMemoForUser);

/**
 * @openapi
 * /api/memo/permanent-delete/{id}:
 *   delete:
 *     tags: [Memos]
 *     summary: Permanently delete a memo
 *     description: >
 *       Permanently removes the memo from the database. Only the memo owner can
 *       perform this action.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Memo ID
 *     responses:
 *       200:
 *         description: Memo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Memo'
 *       401:
 *         description: Unauthorized – not the memo owner or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Memo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.delete("/permanent-delete/:id", permanentDelete);

/**
 * @openapi
 * /api/memo/inbox:
 *   get:
 *     tags: [Memos]
 *     summary: Get memos received by the current user (inbox)
 *     description: Returns paginated memos that have been shared with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Inbox memos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PaginatedMemos'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.get("/inbox", getInbox);

/**
 * @openapi
 * /api/memo/drafts:
 *   get:
 *     tags: [Memos]
 *     summary: Get draft memos owned by the current user
 *     description: Returns paginated draft memos created by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Draft memos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PaginatedMemos'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.get("/drafts", getDraftMemos);

/**
 * @openapi
 * /api/memo/sent:
 *   get:
 *     tags: [Memos]
 *     summary: Get memos sent by the current user
 *     description: Returns paginated memos created and sent by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Sent memos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PaginatedMemos'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.get("/sent", getSentMemos);

/**
 * @openapi
 * /api/memo/{id}:
 *   get:
 *     tags: [Memos]
 *     summary: Get a single memo by ID
 *     description: >
 *       Retrieves a specific memo. The authenticated user must be either the
 *       owner or a recipient of the memo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Memo ID
 *     responses:
 *       200:
 *         description: Memo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Memo'
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Memo not found or access denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
memoRouter.get("/:id", getMemoById);


export default memoRouter;
