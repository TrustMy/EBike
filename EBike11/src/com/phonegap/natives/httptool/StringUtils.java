package com.phonegap.natives.httptool;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class StringUtils {
	/**
	 * ��������ת���ַ�
	 * 
	 * @param stream
	 *            :�����������
	 * @return
	 */
	public static String getStringByInputStream(InputStream stream, String encoding) {
		BufferedReader reader;
		StringBuilder response = null;
		try {
			reader = new BufferedReader(new InputStreamReader(stream, encoding));
			response = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return response.toString();
	}

}
