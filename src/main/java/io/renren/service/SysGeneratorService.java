package io.renren.service;

import io.renren.dao.SysGeneratorDao;
import io.renren.utils.GenUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成器
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年12月19日 下午3:33:38
 */
@Service
public class SysGeneratorService {
	@Autowired
	private SysGeneratorDao sysGeneratorDao;

	public List<String> queryDBList()
	{
		return sysGeneratorDao.queryDBList();
		
	}
	public List<Map<String, Object>> queryList(Map<String, Object> map) {
		return sysGeneratorDao.queryList(map);
	}

	public int queryTotal(Map<String, Object> map) {
		return sysGeneratorDao.queryTotal(map);
	}

	public Map<String, String> queryTable(String tableName,String dbName) {
		return sysGeneratorDao.queryTable(tableName,dbName);
	}

	public List<Map<String, String>> queryColumns(String tableName,String dbName) {
		return sysGeneratorDao.queryColumns(tableName,dbName);
	}

	public byte[] generatorCode(String[] tableNames,String dbName) {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ZipOutputStream zip = new ZipOutputStream(outputStream);
		
		//项目名
		String projectName=dbName.replace('_', '.');
		
		for(String tableName : tableNames){
			//查询表信息
			Map<String, String> table = queryTable(tableName,dbName);
			//查询列信息
			List<Map<String, String>> columns = queryColumns(tableName,dbName);
			//生成代码
			GenUtils.generatorCode(table, columns, zip, projectName);
		}
		IOUtils.closeQuietly(zip);
		return outputStream.toByteArray();
	}
}
