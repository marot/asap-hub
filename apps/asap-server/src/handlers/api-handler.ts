import serverlessHttp from 'serverless-http';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Request as RequestExpress } from 'express';
import * as LightStep from 'lightstep-tracer';
import { appFactory } from '../app';
import { lightstepToken, environment } from '../config';

const lsTracer = new LightStep.Tracer({
  access_token: lightstepToken || '',
  component_name: `asap-hub-express-${environment}`,
  nodejs_instrumentation: true,
});

const app = appFactory({ tracer: lsTracer });

interface RequestWithContext extends RequestExpress {
  context: APIGatewayProxyEventV2['requestContext'];
}

export const apiHandler = serverlessHttp(app, {
  request(request: RequestWithContext, event: APIGatewayProxyEventV2) {
    request.context = event.requestContext;
  },
});