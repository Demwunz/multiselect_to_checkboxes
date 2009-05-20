<?php
	
	class extension_multiselect_to_checkboxes extends Extension {
		public function about() {
			return array(
				'name'			=> 'Multiselect to Checkboxes',
				'version'		=> '1.0',
				'release-date'	=> '2009-05-17',
				'author'		=> array(
					'name'			=> 'Fazal Khan',
					'website'		=> 'http://www.fazalkhan.co.uk',
					'email'			=> 'fazal.khan@airlock.com'
				),
				'description'	=> 'Convert all multiselect fields into checkboxes'
			);
		}
		
		public function getSubscribedDelegates(){
			return array(
				array(
					'page' => '/administration/',
					'delegate' => 'AdminPagePreGenerate',
					'callback' => '__appendAssets'
				)
			);
		}
		
		public function __appendAssets($context){
			if(isset(Administration::instance()->Page->_context['section_handle']) && in_array(Administration::instance()->Page->_context['page'], array('new', 'edit'))){	
				Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/multiselect_to_checkboxes/assets/mtoc.css', 'screen', 221);
				Administration::instance()->Page->addScriptToHead(URL . '/extensions/multiselect_to_checkboxes/assets/jquery.symphony.mtoc.js', 222);			
			}
		}
	}
	
?>