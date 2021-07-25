"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AvailabilityRepository_1 = __importDefault(require("../models/AvailabilityRepository"));
function availabilityController(prismaClient) {
    const availibilityRouter = express_1.default.Router();
    const availabilityRepository = new AvailabilityRepository_1.default(prismaClient);
    availibilityRouter.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return res.status(401).send({ error: "Not Authenticated." });
            const availabilities = yield availabilityRepository.getAvailability(req.user.id);
            res.status(200).json({ availabilities });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    availibilityRouter.post("/search", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const startTime = req.body.startTime;
            if (!req.user)
                return res.status(401).send({ error: "Not Authenticated." });
            if (Array.isArray(startTime)) {
                if (startTime.some((s) => Number.isNaN(Date.parse(s))))
                    return res.status(400).send({ error: "startTime in the wrong format." });
            }
            else {
                if (Number.isNaN(Date.parse(startTime)))
                    return res.status(400).send({ error: "startTime in the wrong format." });
            }
            const availabilities = yield availabilityRepository.searchAvailability(req.user.id, startTime);
            res.status(200).json({ availabilities });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    availibilityRouter.put("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        // TODO: Handle invalid keys
        try {
            if (!req.user)
                return res.status(401).send({ error: "Not Authenticated." });
            const availabilityMap = req.body.availabilities;
            const availabilities = yield availabilityRepository.updateAvailabilities(req.user.id, availabilityMap);
            res.status(200).json({ availabilities });
        }
        catch (e) {
            res.status(500).send({ error: e.message });
        }
    }));
    return availibilityRouter;
}
exports.default = availabilityController;
