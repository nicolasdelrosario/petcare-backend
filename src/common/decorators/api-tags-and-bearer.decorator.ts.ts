// NestJS
import { applyDecorators } from '@nestjs/common'

// Swagger
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

export function ApiTagsAndBearer(...tags: string[]) {
	return applyDecorators(ApiBearerAuth(), ApiTags(...tags))
}
