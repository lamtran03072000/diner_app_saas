import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const OrgId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const orgId = req.user?.orgId;
  if (!orgId) {
    throw new ForbiddenException('orgId is required in auth context');
  }
  return orgId;
});


