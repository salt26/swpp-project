import time
import sys
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

if len(sys.argv) != 2:
    print("signUpChecker.py <url>")
    exit(1)

def check(driver, name):
    try:
        itm = driver.find_element_by_id(name)
    except NoSuchElementException:
        print("Cannot find %s" % name)
        exit(1)

driver = webdriver.Chrome('/usr/local/bin/chromedriver')
driver.get(sys.argv[1])
check(driver, 'sign_up')

driver.quit()
print("Successful!")
