"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const exercise_controller_1 = require("./exercise/exercise.controller");
const reward_controller_1 = require("./reward/reward.controller");
const reward_service_1 = require("./reward/reward.service");
const exercise_service_1 = require("./exercise/exercise.service");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        controllers: [exercise_controller_1.ExerciseController, reward_controller_1.RewardController],
        providers: [reward_service_1.RewardService, exercise_service_1.ExerciseService]
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map