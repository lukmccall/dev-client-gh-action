import * as cli from '@actions/exec';
import { Config } from './config';
import { getInput, error, info } from '@actions/core';

export async function run(): Promise<void> {
	const config: Config = {
		channel: getInput('channel'),
		cliPath: getInput('expo-cli-path') || 'expo',
	};

	console.log('Cos');
	const output = await cli.getExecOutput(`${config.cliPath} publish --release-channel=${config}`);
	if (!output.exitCode) {
		error(output.stderr);
		return;
	}

	await cli.exec(`echo ${output.stdout}`);
	info(output.stdout);
}
